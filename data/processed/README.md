# Crowd Dataset (Task 1)

## Что сделано
Исходный `test_ecom.tsv` преобразован в 2 удобных таблицы:

1. `crowd_assignments_clean.csv` — уровень ассаймента (страницы заданий).
2. `crowd_tasks_clean.csv` — уровень отдельного задания внутри ассаймента (tidy long format).

## Файлы
- `crowd_assignments_clean.csv`: 21,437 строк, 19 колонок.
- `crowd_tasks_clean.csv`: 203,963 строк, 19 колонок.

## Ключевые поля

### crowd_assignments_clean.csv
- `assignment_id` — ID ассаймента.
- `worker_id` — ID исполнителя.
- `assignment_status` — статус (`APPROVED`, `EXPIRED`, `SKIPPED`).
- `assignment_start_ts`, `assignment_submit_ts`, `assignment_skip_ts` — Unix time.
- `assignment_start_utc`, `assignment_submit_utc`, `assignment_skip_utc` — ISO datetime (UTC).
- `assignment_start_msk`, `assignment_submit_msk`, `assignment_skip_msk` — ISO datetime (Europe/Moscow).
- `work_duration_sec` — длительность работы в секундах (`submit/skip - start`).
- `tasks_total`, `solutions_total`, `answered_tasks_total` — объем задач/ответов.
- `control_tasks_total`, `regular_tasks_total`, `has_control_tasks` — признаки контрольных заданий.

### crowd_tasks_clean.csv
- `assignment_id`, `worker_id`, `assignment_status` — связь с ассайментом.
- `task_index` — номер задания на странице (с 1).
- `is_control_task` — контрольное задание (если есть `known_solutions`).
- `known_solutions_count` — число эталонных ответов.
- `known_answer_result` — правильный ответ для контрольного задания.
- `worker_answer_result` — ответ исполнителя.
- `is_correct_control` — корректность ответа на контрольном задании.
- `correctness_weight` — вес корректности из источника.
- `task_url` — URL сайта из задания.
- `workflow` — тип workflow из `input_values`.
- `has_hints` — есть ли подсказки.
- `worker_output_values_json`, `known_output_values_json` — исходные JSON-фрагменты с ответами.
- `assignment_start_utc`, `assignment_submit_utc`, `assignment_skip_utc`, `work_duration_sec` — временной контекст из ассаймента.

## Как пересобрать
```bash
python3 scripts/prepare_crowd_dataset.py \
  --input "/Users/zeliboba/Downloads/Технический менеджер проектов (стажер) Crowd /test_ecom.tsv" \
  --output-dir "/Users/zeliboba/Desktop/SC⚽️RE/site/data/processed"
```
