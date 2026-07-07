#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

python build_static.py
touch dist/.nojekyll

# Serve security.txt at the standard /.well-known/ path (not /static/.well-known/).
mkdir -p dist/.well-known
cp static/.well-known/security.txt dist/.well-known/security.txt

if [ -n "${SITE_DOMAIN:-}" ]; then
  echo "$SITE_DOMAIN" > dist/CNAME
fi
