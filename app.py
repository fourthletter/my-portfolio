from __future__ import annotations

import os
import secrets
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from flask import Flask, Response, abort, render_template, request

from links import LINK_ENV_KEYS, link_default_for_slug
from portfolio_data import (
    ABOUT_PAGE,
    PROJECTS,
    SITE_HOME,
    featured_projects,
    get_project_by_slug,
    resolve_project_images,
)

BASE_DIR = Path(__file__).resolve().parent


def safe_http_url(value: str | None) -> str | None:
    """Allow only http(s) URLs with a host (blocks javascript:, data:, etc.)."""
    if not value or not isinstance(value, str):
        return None
    stripped = value.strip()
    if not stripped:
        return None
    parsed = urlparse(stripped)
    if parsed.scheme.lower() not in ("http", "https"):
        return None
    if not parsed.netloc:
        return None
    return stripped


app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = os.environ.get("SECRET_KEY") or secrets.token_hex(32)


@app.after_request
def add_security_headers(response: Response) -> Response:
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
    return response


@app.template_filter("safe_http_url")
def safe_http_url_filter(value: str | None) -> str | None:
    return safe_http_url(value)


@app.context_processor
def inject_site_navigation() -> dict[str, object]:
    return {
        "current_year": datetime.now().year,
        "nav_items": [
            {"endpoint": "home", "label": "Home"},
            {"endpoint": "about", "label": "Bio"},
            {"endpoint": "projects", "label": "Projects"},
        ]
    }


@app.route("/", methods=["GET"])
def home():
    return render_template(
        "index.html",
        page_title="Di Luong Portfolio",
        site_home=SITE_HOME,
        projects=featured_projects(PROJECTS),
    )


@app.route("/about/", methods=["GET"])
def about():
    return render_template(
        "about.html",
        page_title="Bio | Di Luong",
        about=ABOUT_PAGE,
    )


@app.route("/projects/", methods=["GET"])
def projects():
    return render_template(
        "projects.html",
        page_title="Projects | Di Luong",
        projects=PROJECTS,
    )


@app.route("/projects/<slug>/", methods=["GET"])
def project_detail(slug: str):
    project = get_project_by_slug(slug)
    if project is None:
        abort(404)

    project_images = resolve_project_images(project, BASE_DIR / "static")
    return render_template(
        "project_detail.html",
        page_title=f"{project.title} | Di Luong",
        project=project,
        project_images=project_images,
    )


@app.route("/go/<slug>/", methods=["GET"])
def go(slug: str):
    env_key = LINK_ENV_KEYS.get(slug)
    if env_key is None:
        abort(404)

    target = safe_http_url(os.environ.get(env_key)) or safe_http_url(link_default_for_slug(slug))
    return render_template(
        "go.html",
        page_title="Redirecting",
        target=target,
        slug=slug,
    )


@app.errorhandler(404)
def page_not_found(_error):
    return render_template("404.html", page_title="Not Found | Di Luong"), 404


@app.context_processor
def inject_request_path() -> dict[str, str]:
    return {"request_path": request.path}


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_DEBUG", "0") == "1",
    )
