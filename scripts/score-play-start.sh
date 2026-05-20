#!/usr/bin/env bash
set -euo pipefail

prefix="${1:-score-play}"
stamp="$(date +%Y%m%d-%H%M)"
branch="${prefix}/${stamp}"

git fetch origin
git checkout main
git pull --rebase origin main
git checkout -b "$branch"

echo "Created and switched to: $branch"
echo "Now edit only files in 'SCORE PLAY/' and commit."
