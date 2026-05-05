from __future__ import annotations

import os
from pathlib import Path

from flask import Flask, abort, render_template, request

from portfolio_data import (
    BIO_PARAGRAPHS,
    CAPABILITIES,
    PROJECTS,
    SKILLS,
    get_project_by_slug,
    resolve_project_images,
)

BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.context_processor
def inject_site_navigation() -> dict[str, list[dict[str, str]]]:
    return {
        "nav_items": [
            {"endpoint": "home", "label": "Home"},
            {"endpoint": "about", "label": "Bio"},
            {"endpoint": "projects", "label": "Projects"},
        ]
    }


@app.route("/")
def home():
    return render_template(
        "index.html",
        page_title="Di Luong Portfolio",
        skills=SKILLS,
        projects=PROJECTS[:4],
    )


@app.route("/about/")
def about():
    return render_template(
        "about.html",
        page_title="Bio | Di Luong",
        bio_paragraphs=BIO_PARAGRAPHS,
        capabilities=CAPABILITIES,
        skills=SKILLS,
    )


@app.route("/projects/")
def projects():
    return render_template(
        "projects.html",
        page_title="Projects | Di Luong",
        projects=PROJECTS,
    )


@app.route("/projects/<slug>/")
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
