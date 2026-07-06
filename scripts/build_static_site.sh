#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

python build_static.py
touch dist/.nojekyll

if [ -n "${SITE_DOMAIN:-}" ]; then
  echo "$SITE_DOMAIN" > dist/CNAME
fi
