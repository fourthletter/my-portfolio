from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import frontmatter
import markdown
import nh3
import yaml


CONTENT_DIR = Path(__file__).resolve().parent / "content"

_MARKDOWN_HTML_TAGS = frozenset({
    "p",
    "br",
    "hr",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "strong",
    "em",
    "b",
    "i",
    "del",
    "s",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "a",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "img",
})

_MARKDOWN_HTML_ATTRIBUTES = {
    "a": {"href", "title"},
    "img": {"src", "alt", "title", "loading"},
    "th": {"colspan", "rowspan"},
    "td": {"colspan", "rowspan"},
    "code": {"class"},
    "pre": {"class"},
}


def _sanitize_markdown_html(html: str) -> str:
    """Strip unsafe tags/attributes from Markdown output (scripts, event handlers, etc.)."""
    if not html.strip():
        return ""
    return nh3.clean(
        html,
        tags=_MARKDOWN_HTML_TAGS,
        attributes=_MARKDOWN_HTML_ATTRIBUTES,
        url_schemes={"http", "https", "mailto"},
        link_rel="noopener noreferrer",
    )


def _render_markdown(text: str) -> str:
    stripped = text.strip()
    if not stripped:
        return ""
    raw_html = markdown.markdown(
        stripped,
        extensions=["extra", "nl2br"],
        output_format="html5",
    )
    return _sanitize_markdown_html(raw_html)


@dataclass(frozen=True)
class Project:
    slug: str
    title: str
    description: str
    stack: list[str]
    challenge: str
    approach: str
    impact: str
    image: str | None = None
    images: list[str] = field(default_factory=list)
    highlights: list[str] = field(default_factory=list)
    references: list[dict[str, str]] = field(default_factory=list)
    featured: bool = False
    weight: int = 0
    body_html: str | None = None


@dataclass(frozen=True)
class AboutPage:
    headline: str
    capabilities: list[str]
    skills: list[str]
    bio_html: str


@dataclass(frozen=True)
class SiteHome:
    hero_title: str
    hero_lead: str
    quick_intro: str


def _parse_references(raw: Any) -> list[dict[str, str]]:
    if not raw:
        return []
    out: list[dict[str, str]] = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        label = item.get("label")
        slug = item.get("slug")
        if label is None or slug is None:
            continue
        out.append({"label": str(label), "slug": str(slug)})
    return out


def load_site_home(content_dir: Path = CONTENT_DIR) -> SiteHome:
    path = content_dir / "site.yaml"
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    home = raw.get("home") or {}
    return SiteHome(
        hero_title=str(home.get("hero_title", "")),
        hero_lead=str(home.get("hero_lead", "")),
        quick_intro=str(home.get("quick_intro", "")),
    )


def load_about_page(content_dir: Path = CONTENT_DIR) -> AboutPage:
    path = content_dir / "about.md"
    post = frontmatter.loads(path.read_text(encoding="utf-8"))
    fm = post.metadata or {}
    caps = fm.get("capabilities") or []
    skills = fm.get("skills") or []
    return AboutPage(
        headline=str(fm.get("headline", "")),
        capabilities=[str(x) for x in caps],
        skills=[str(x) for x in skills],
        bio_html=_render_markdown(post.content),
    )


def _project_from_file(path: Path, fm: dict[str, Any], body: str) -> Project:
    slug = str(fm.get("slug") or path.stem)
    title = fm.get("title")
    description = fm.get("description")
    stack_raw = fm.get("stack")
    if not title or not description:
        raise ValueError(f"{path}: front matter requires title and description")
    if not stack_raw or not isinstance(stack_raw, list):
        raise ValueError(f"{path}: front matter requires stack as a list")

    images_fm = fm.get("images")
    image_fm = fm.get("image")
    images_list: list[str] = []
    if images_fm:
        if not isinstance(images_fm, list):
            raise ValueError(f"{path}: images must be a list of paths")
        images_list = [str(x) for x in images_fm]
    image_single: str | None = str(image_fm) if image_fm else None

    rendered = _render_markdown(body)
    body_html = rendered if rendered else None

    return Project(
        slug=slug,
        title=str(title),
        description=str(description),
        stack=[str(x) for x in stack_raw],
        challenge=str(fm.get("challenge", "")),
        approach=str(fm.get("approach", "")),
        impact=str(fm.get("impact", "")),
        image=image_single,
        images=images_list,
        highlights=[str(x) for x in (fm.get("highlights") or [])],
        references=_parse_references(fm.get("references")),
        featured=bool(fm.get("featured", False)),
        weight=int(fm.get("weight", 0)),
        body_html=body_html,
    )


def load_projects(content_dir: Path = CONTENT_DIR) -> list[Project]:
    projects_dir = content_dir / "projects"
    if not projects_dir.is_dir():
        raise FileNotFoundError(f"Missing projects directory: {projects_dir}")

    projects: list[Project] = []
    for md_path in sorted(projects_dir.glob("*.md")):
        post = frontmatter.loads(md_path.read_text(encoding="utf-8"))
        projects.append(_project_from_file(md_path, dict(post.metadata or {}), post.content))

    slugs = [p.slug for p in projects]
    if len(slugs) != len(set(slugs)):
        raise ValueError("Duplicate project slug in content/projects/*.md")

    return sorted(projects, key=lambda p: (p.weight, p.slug))


def featured_projects(all_projects: list[Project]) -> list[Project]:
    """Projects shown on the home page (Hugo-style `featured` flag, with a sensible default)."""
    marked = [p for p in all_projects if p.featured]
    if marked:
        return sorted(marked, key=lambda p: (p.weight, p.slug))
    return sorted(all_projects, key=lambda p: (p.weight, p.slug))[:4]


SITE_HOME = load_site_home()
ABOUT_PAGE = load_about_page()
PROJECTS = load_projects()


def get_project_by_slug(slug: str) -> Project | None:
    return next((project for project in PROJECTS if project.slug == slug), None)


def resolve_project_images(project: Project, static_dir: Path) -> list[str]:
    image_paths = project.images or ([project.image] if project.image else [])
    valid_images: list[str] = []
    for image_path in image_paths:
        if image_path and (static_dir / image_path).exists():
            valid_images.append(image_path)
    return valid_images
