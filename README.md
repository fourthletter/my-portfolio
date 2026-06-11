# Portfolio (static site)

Personal portfolio built as **static HTML** with [Frozen-Flask](https://pythonhosted.org/Frozen-Flask/). Edit Markdown under `content/`, run one build command, and deploy the `dist/` folder.

**Production:** https://diluong.net

## How it works

1. Flask renders templates and Markdown from `content/` at **build time**.
2. `build_static.py` freezes every route into `dist/` (plain HTML, CSS, images).
3. Hosts serve `dist/` as a static site—no Python runtime in production.

```
content/ + templates/  →  python build_static.py  →  dist/  →  GitHub Pages / Render / Docker
```

## Local build

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-build.txt
cp .env.example .env   # optional: set LINK_* URLs

chmod +x scripts/build_static_site.sh
./scripts/build_static_site.sh
```

Preview locally:

```bash
cd dist && python -m http.server 8080
```

Open <http://127.0.0.1:8080>.

## Docker (static preview)

Builds `dist/` inside the image and serves it with nginx on localhost:

```bash
docker compose up --build
```

Open <http://127.0.0.1:8080>.

## Deploy to GitHub Pages (diluong.net)

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. Installs `requirements-build.txt`
2. Runs `./scripts/build_static_site.sh` (writes `dist/CNAME` → `diluong.net`)
3. Deploys `dist/` to GitHub Pages

Outbound link URLs come from **GitHub Actions secrets** (`LINK_*`). Optional `SITE_DOMAIN` overrides the CNAME.

## Deploy to Render

[`render.yaml`](render.yaml) defines a **Static Site** that runs the same build and publishes `dist/`.

1. Sign in at [render.com](https://render.com) and **New → Blueprint**.
2. Connect the `fourthletter/my-portfolio` repo—Render reads `render.yaml`.
3. On the `diluong-portfolio` service, add the same `LINK_*` environment variables you use in GitHub Actions.
4. After the first deploy, add custom domain **diluong.net** under **Settings → Custom Domains** (if using Render for production).

Render redeploys automatically on every push to `main`.

> **DNS:** Point `diluong.net` at **either** GitHub Pages **or** Render, not both. Disable the custom domain on the host you are not using.

## Local Flask dev (optional)

For live reload while editing templates:

```bash
pip install -r requirements.txt
flask --app app run
```

Open <http://localhost:5000>. This is for development only—production always uses the static build.

## Routes

- `/` – Home
- `/about/` – Bio
- `/projects/` – Projects index
- `/projects/<slug>/` – Project detail / case study
- `/go/<slug>/` – Outbound redirect (baked into static HTML at build time)

## Content (Markdown & YAML)

| Location | Purpose |
| -------- | ------- |
| [`content/site.yaml`](content/site.yaml) | Home hero title, lead paragraph, and “quick intro” |
| [`content/about.md`](content/about.md) | Bio headline, capability/skill lists (YAML front matter), and body text as **Markdown** |
| [`content/projects/*.md`](content/projects/) | One file per project: structured fields in **YAML front matter** (`title`, `slug`, `stack`, `challenge`, `approach`, `impact`, `featured`, `weight`, images, references, …); optional **Markdown** below the front matter renders after the case-study columns |

Projects are ordered by `weight`, then slug. Set **`featured: true`** on items that should appear on the home page; if none are featured, the first four projects by that sort order are shown.

## Outbound link configuration

Outbound links use slugs so URLs stay out of source. The mapping lives in [`links.py`](links.py); values are read from environment variables **at build time**.

When a variable is not set, [`links.py`](links.py) falls back to built-in defaults.

Set these in `.env` (local builds), **GitHub Actions secrets**, and **Render env vars**:

- `LINK_CONTACT_GITHUB`
- `LINK_CONTACT_LINKEDIN`
- `LINK_ESUSU_REPO`
- `LINK_ESUSU_PRESS`
- `LINK_NANNY_STATE_REPO`
- `LINK_NANNY_STATE_PRESS`
- `LINK_EXPOSING_THE_INVISIBLE`
- `LINK_MAPPING_PRETRIAL_RISK`
- `LINK_DEMOCHAT_VIDEO`
- `LINK_DEMOCHAT_PRESS`

See [`.env.example`](.env.example).

## Security posture

- Markdown bodies are converted to HTML with Python-Markdown, then sanitized with **`nh3`** before templates render them.
- Every page sets a strict `Content-Security-Policy` meta tag (`default-src 'none'`, `script-src 'none'`, `style-src 'self'`, etc.).
- Slug-based outbound URLs are resolved from env vars (or safe defaults in `links.py`) at build time.
- `safe_http_url` rejects any non-`http(s)` scheme before it reaches the redirect template.
- Render adds `X-Frame-Options`, `X-Content-Type-Options`, and related headers via `render.yaml`.
