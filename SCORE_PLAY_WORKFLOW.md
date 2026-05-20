# SCORE PLAY workflow without conflicts

## One-time setup
Run once in this repository:

```bash
git config --local pull.rebase true
git config --local rebase.autoStash true
git config --local rerere.enabled true
git config --local core.hooksPath .githooks
chmod +x .githooks/pre-commit scripts/score-play-start.sh scripts/score-play-sync.sh
```

## Start new SCORE PLAY task

```bash
./scripts/score-play-start.sh
```

This creates a new branch like `score-play/20260520-1540`.

## During work

```bash
./scripts/score-play-sync.sh
```

This rebases your branch on latest `origin/main`.

## Commit and push

```bash
git add "SCORE PLAY/"
git commit -m "SCORE PLAY: <what changed>"
git push -u origin HEAD
```

## Why conflicts become rare

- You work in a separate branch.
- You edit only `SCORE PLAY/`.
- Pre-commit hook blocks accidental changes outside `SCORE PLAY/`.
- Rebase keeps history linear and cleaner.
