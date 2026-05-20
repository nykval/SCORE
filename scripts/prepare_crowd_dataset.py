#!/usr/bin/env python3
"""Prepare tidy datasets from Crowd assignment log TSV."""

from __future__ import annotations

import argparse
import csv
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

MSK_TZ = timezone.utc

try:
    from zoneinfo import ZoneInfo

    MSK_TZ = ZoneInfo("Europe/Moscow")
except Exception:
    pass


def parse_epoch(value: str) -> Optional[int]:
    if value is None:
        return None
    value = value.strip()
    if not value:
        return None
    try:
        return int(value)
    except ValueError:
        return None


def epoch_to_iso(value: Optional[int], tz: timezone = timezone.utc) -> Optional[str]:
    if value is None:
        return None
    return datetime.fromtimestamp(value, tz=tz).isoformat()


def safe_json_loads(raw: str, fallback: Any) -> Any:
    if not raw:
        return fallback
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return fallback


def extract_result(output_values: Any) -> Optional[str]:
    if not isinstance(output_values, dict):
        return None
    result = output_values.get("result")
    return str(result) if result is not None else None


def extract_task_url(task: Dict[str, Any]) -> Optional[str]:
    input_values = task.get("input_values") if isinstance(task, dict) else None
    if not isinstance(input_values, dict):
        return None

    input_block = input_values.get("input")
    if not isinstance(input_block, dict):
        return None

    view = input_block.get("view")
    if not isinstance(view, dict):
        return None

    data = view.get("data")
    if not isinstance(data, dict):
        return None

    region_markup = data.get("region_markup")
    if not isinstance(region_markup, dict):
        return None

    url = region_markup.get("url")
    return str(url) if url is not None else None


def first_known_solution(task: Dict[str, Any]) -> Tuple[Optional[Dict[str, Any]], int]:
    known = task.get("known_solutions") if isinstance(task, dict) else None
    if not isinstance(known, list) or not known:
        return None, 0

    for item in known:
        if isinstance(item, dict):
            return item, len(known)
    return None, len(known)


def build_assignment_row(row: Dict[str, str], tasks: List[Any], solutions: List[Any]) -> Dict[str, Any]:
    start_ts = parse_epoch(row.get("assignment_start_time", ""))
    submit_ts = parse_epoch(row.get("assignment_submit_time", ""))
    skip_ts = parse_epoch(row.get("assignment_skip_time", ""))

    end_ts = submit_ts if submit_ts is not None else skip_ts
    work_duration_sec = end_ts - start_ts if (start_ts is not None and end_ts is not None) else None

    control_count = 0
    for task in tasks:
        if isinstance(task, dict) and task.get("known_solutions"):
            control_count += 1

    assignment_id = row.get("assignment_assignment_id")

    return {
        "assignment_id": int(assignment_id) if assignment_id and assignment_id.isdigit() else assignment_id,
        "worker_id": row.get("worker_id"),
        "assignment_status": row.get("assignment_status"),
        "assignment_start_ts": start_ts,
        "assignment_submit_ts": submit_ts,
        "assignment_skip_ts": skip_ts,
        "assignment_start_utc": epoch_to_iso(start_ts, timezone.utc),
        "assignment_submit_utc": epoch_to_iso(submit_ts, timezone.utc),
        "assignment_skip_utc": epoch_to_iso(skip_ts, timezone.utc),
        "assignment_start_msk": epoch_to_iso(start_ts, MSK_TZ),
        "assignment_submit_msk": epoch_to_iso(submit_ts, MSK_TZ),
        "assignment_skip_msk": epoch_to_iso(skip_ts, MSK_TZ),
        "work_duration_sec": work_duration_sec,
        "tasks_total": len(tasks),
        "solutions_total": len(solutions),
        "answered_tasks_total": sum(
            1
            for sol in solutions
            if isinstance(sol, dict) and extract_result(sol.get("output_values")) is not None
        ),
        "control_tasks_total": control_count,
        "regular_tasks_total": len(tasks) - control_count,
        "has_control_tasks": control_count > 0,
    }


def build_task_rows(
    row: Dict[str, str], tasks: List[Any], solutions: List[Any], assignment_level: Dict[str, Any]
) -> List[Dict[str, Any]]:
    records: List[Dict[str, Any]] = []
    max_len = max(len(tasks), len(solutions))

    for idx in range(max_len):
        task = tasks[idx] if idx < len(tasks) and isinstance(tasks[idx], dict) else {}
        solution = solutions[idx] if idx < len(solutions) and isinstance(solutions[idx], dict) else {}

        known_first, known_count = first_known_solution(task)
        known_output = known_first.get("output_values") if isinstance(known_first, dict) else None
        known_result = extract_result(known_output)

        worker_output = solution.get("output_values") if isinstance(solution, dict) else None
        worker_result = extract_result(worker_output)

        workflow = None
        input_values = task.get("input_values") if isinstance(task, dict) else None
        if isinstance(input_values, dict):
            input_block = input_values.get("input")
            if isinstance(input_block, dict):
                workflow_value = input_block.get("workflow")
                workflow = str(workflow_value) if workflow_value is not None else None

        is_control = known_count > 0
        is_correct = None
        if is_control and worker_result is not None and known_result is not None:
            is_correct = worker_result == known_result

        rec = {
            "assignment_id": assignment_level["assignment_id"],
            "worker_id": assignment_level["worker_id"],
            "assignment_status": assignment_level["assignment_status"],
            "task_index": idx + 1,
            "is_control_task": is_control,
            "known_solutions_count": known_count,
            "known_answer_result": known_result,
            "worker_answer_result": worker_result,
            "is_correct_control": is_correct,
            "correctness_weight": (
                known_first.get("correctness_weight")
                if isinstance(known_first, dict)
                else None
            ),
            "task_url": extract_task_url(task),
            "workflow": workflow,
            "has_hints": bool(task.get("hints")) if isinstance(task, dict) else False,
            "worker_output_values_json": json.dumps(worker_output, ensure_ascii=False)
            if worker_output is not None
            else None,
            "known_output_values_json": json.dumps(known_output, ensure_ascii=False)
            if known_output is not None
            else None,
            "assignment_start_utc": assignment_level["assignment_start_utc"],
            "assignment_submit_utc": assignment_level["assignment_submit_utc"],
            "assignment_skip_utc": assignment_level["assignment_skip_utc"],
            "work_duration_sec": assignment_level["work_duration_sec"],
        }
        records.append(rec)

    return records


def process(input_path: Path, output_dir: Path) -> Tuple[int, int]:
    output_dir.mkdir(parents=True, exist_ok=True)

    assignments_path = output_dir / "crowd_assignments_clean.csv"
    tasks_path = output_dir / "crowd_tasks_clean.csv"

    assignment_rows = 0
    task_rows = 0

    with input_path.open("r", encoding="utf-8", newline="") as src, \
        assignments_path.open("w", encoding="utf-8", newline="") as fa, \
        tasks_path.open("w", encoding="utf-8", newline="") as ft:

        reader = csv.DictReader(src, delimiter="\t")

        assignment_writer = None
        task_writer = None

        for row in reader:
            tasks = safe_json_loads(row.get("task_suite_raw_tasks", ""), [])
            if not isinstance(tasks, list):
                tasks = []

            solutions = safe_json_loads(row.get("assignment_raw_solutions", ""), [])
            if not isinstance(solutions, list):
                solutions = []

            assignment_level = build_assignment_row(row, tasks, solutions)
            task_level = build_task_rows(row, tasks, solutions, assignment_level)

            if assignment_writer is None:
                assignment_writer = csv.DictWriter(
                    fa,
                    fieldnames=list(assignment_level.keys()),
                )
                assignment_writer.writeheader()

            if task_writer is None and task_level:
                task_writer = csv.DictWriter(
                    ft,
                    fieldnames=list(task_level[0].keys()),
                )
                task_writer.writeheader()

            assignment_writer.writerow(assignment_level)
            assignment_rows += 1

            for task_rec in task_level:
                task_writer.writerow(task_rec)
                task_rows += 1

    return assignment_rows, task_rows


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Transform crowd TSV log into analysis-friendly CSV datasets"
    )
    parser.add_argument(
        "--input",
        required=True,
        type=Path,
        help="Path to source TSV file",
    )
    parser.add_argument(
        "--output-dir",
        default=Path("data/processed"),
        type=Path,
        help="Directory for output CSV files",
    )

    args = parser.parse_args()

    assignment_rows, task_rows = process(args.input, args.output_dir)
    print(f"Done. assignments={assignment_rows}, tasks={task_rows}")
    print(f"Assignments: {args.output_dir / 'crowd_assignments_clean.csv'}")
    print(f"Tasks: {args.output_dir / 'crowd_tasks_clean.csv'}")


if __name__ == "__main__":
    main()
