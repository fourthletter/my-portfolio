#!/usr/bin/env python3
"""Post-build checks for the static site in dist/."""

from __future__ import annotations

import base64
import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
CSS_PATH = DIST / "static" / "css" / "styles.css"
STYLESHEET_LINK = '<link rel="stylesheet" href="/static/css/styles.css"'

FORBIDDEN_PATTERNS = (
    re.compile(r"<script", re.IGNORECASE),
    re.compile(r"javascript:", re.IGNORECASE),
    re.compile(r"onerror\s*=", re.IGNORECASE),
)

HTTPS_URL_PATTERN = re.compile(r'https://[^"\'<>\s]+')


def apply_stylesheet_sri() -> str:
    if not CSS_PATH.is_file():
        raise SystemExit(f"Missing stylesheet: {CSS_PATH}")

    digest = hashlib.sha384(CSS_PATH.read_bytes()).digest()
    integrity = f"sha384-{base64.b64encode(digest).decode()}"
    replacement = (
        f'{STYLESHEET_LINK} integrity="{integrity}" crossorigin="anonymous" />'
    )

    for html_path in DIST.rglob("*.html"):
        text = html_path.read_text(encoding="utf-8")
        if STYLESHEET_LINK not in text:
            continue
        if 'integrity="' in text:
            continue
        updated = text.replace(f"{STYLESHEET_LINK} />", replacement)
        html_path.write_text(updated, encoding="utf-8")

    return integrity


def verify_security_txt() -> None:
    security_txt = DIST / ".well-known" / "security.txt"
    if not security_txt.is_file():
        raise SystemExit(f"Missing {security_txt}")


def verify_html_safety() -> None:
    for html_path in DIST.rglob("*.html"):
        text = html_path.read_text(encoding="utf-8")
        for pattern in FORBIDDEN_PATTERNS:
            if pattern.search(text):
                raise SystemExit(f"Forbidden pattern {pattern.pattern!r} in {html_path}")


def verify_go_redirects() -> None:
    go_dir = DIST / "go"
    if not go_dir.is_dir():
        return

    for html_path in go_dir.rglob("index.html"):
        text = html_path.read_text(encoding="utf-8")
        if "Link unavailable" in text:
            continue

        urls = HTTPS_URL_PATTERN.findall(text)
        if not urls:
            raise SystemExit(f"No HTTPS redirect target found in {html_path}")

        for url in urls:
            if not url.startswith("https://"):
                raise SystemExit(f"Non-HTTPS redirect in {html_path}: {url}")


def main() -> None:
    if not DIST.is_dir():
        raise SystemExit(f"Missing build output: {DIST}")

    integrity = apply_stylesheet_sri()
    verify_security_txt()
    verify_html_safety()
    verify_go_redirects()
    print(f"Build verification passed (stylesheet integrity: {integrity[:20]}…)")


if __name__ == "__main__":
    main()
