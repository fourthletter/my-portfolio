# Portfolio (static site)

Personal portfolio built as **static HTML** with [Frozen-Flask](https://pythonhosted.org/Frozen-Flask/). Edit Markdown under `content/`, run one build command, and deploy the `dist/` folder.

**Production:** https://diluong.net (Render)

## How it works

1. Flask renders templates and Markdown from `content/` at **build time**.
2. `build_static.py` freezes every route into `dist/` (plain HTML, CSS, images).
3. Render serves `dist/` as a static site over its CDN—no Python runtime in production.

```
content/ + templates/  →  build_static_site.sh  →  dist/  →  Render (diluong.net)
```

## Launch on Render

Repo and blueprint are ready. One-time setup:

### 1. Apply the Blueprint

Open this link (sign in to Render if prompted):

**https://dashboard.render.com/blueprint/new?repo=https://github.com/fourthletter/my-portfolio**

- Connect your GitHub account if needed.
- Render reads [`render.yaml`](render.yaml) and creates the `diluong-portfolio` static site.
- When prompted, enter values for every **`LINK_*`** environment variable (same URLs you previously used in GitHub Actions secrets).

### 2. Wait for the first deploy

The build runs:

```bash
pip install -r requirements-build.txt && ./scripts/build_static_site.sh
```

Check the **Logs** tab on the service until the deploy shows **Live**.

### 3. Move diluong.net from GitHub Pages to Render

**On GitHub** (repo **Settings → Pages**):

- Remove the custom domain **diluong.net** (and `www` if listed).

**On Render** (service **Settings → Custom Domains**):

- Confirm **diluong.net** is listed (declared in `render.yaml`).
- Copy the DNS records Render shows (typically a CNAME for `www` and an ANAME/ALIAS or A record for the apex `@`).

**At your domain registrar** (where you bought diluong.net):

- Replace GitHub Pages DNS records with Render’s records.
- DNS can take up to an hour to propagate.

### 4. Verify

- https://diluong.net loads your portfolio
- https://www.diluong.net redirects to the apex (Render handles this automatically)

After setup, every push to **`main`** triggers an automatic Render redeploy.

The `onrender.com` subdomain is disabled in [`render.yaml`](render.yaml) (`renderSubdomainPolicy: disabled`); the site is only served at **diluong.net** once DNS is configured.

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

Set these in `.env` (local builds) and **Render env vars**:

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
