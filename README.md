# Portfolio (Flask)

Personal portfolio rendered by a small Flask app. **Production** is a static build deployed to **https://diluong.net** via GitHub Pages. Use Docker for a private local copy.

## Production (diluong.net)

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which freezes the site with Frozen-Flask and deploys to GitHub Pages with custom domain **`diluong.net`**.

Outbound link URLs come from GitHub Actions secrets (`LINK_*`). Optional `SITE_DOMAIN` overrides the `CNAME` file (defaults to `diluong.net`).

## Docker (local / private)

```bash
cp .env.example .env
# Edit .env with your outbound link URLs and a SECRET_KEY

docker compose up --build
```

Open <http://127.0.0.1:8080>. By default the port is bound to **localhost only** so the site stays private on your machine.

To reach it from other devices on your home network, change the port mapping in `docker-compose.yml` from `127.0.0.1:8080:5000` to `8080:5000` and use your machine’s LAN IP.

Stop the container:

```bash
docker compose down
```

## Local development (without Docker)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask --app app run
```

Open <http://localhost:5000>.

## Routes

- `/` – Home
- `/about/` – Bio
- `/projects/` – Projects index
- `/projects/<slug>/` – Project detail / case study
- `/go/<slug>/` – Outbound redirect (resolves the destination from an environment variable; see "Outbound link configuration" below)

## Content (Markdown & YAML)

Most copy lives under **`content/`**, similar to a Hugo-style repo:

| Location | Purpose |
| -------- | ------- |
| [`content/site.yaml`](content/site.yaml) | Home hero title, lead paragraph, and “quick intro” |
| [`content/about.md`](content/about.md) | Bio headline, capability/skill lists (YAML front matter), and body text as **Markdown** |
| [`content/projects/*.md`](content/projects/) | One file per project: structured fields in **YAML front matter** (`title`, `slug`, `stack`, `challenge`, `approach`, `impact`, `featured`, `weight`, images, references, …); optional **Markdown** below the front matter renders after the case-study columns |

Projects are ordered by `weight`, then slug. Set **`featured: true`** on items that should appear on the home page; if none are featured, the first four projects by that sort order are shown.

Outbound reference buttons still use slugs resolved via [`links.py`](links.py) (same as before).

### Who can change what visitors see

This project does **not** include a web UI or API for editing Markdown—nothing on the site accepts uploads or saves content to disk. HTML is produced from files in **`content/`** when the app starts (or when you rebuild the Docker image after editing content). Markdown is rendered then passed through an HTML **allowlist sanitizer** (`nh3`) so unsafe tags and URLs are dropped even if malicious content were merged by mistake.

## Outbound link configuration

Outbound links use a slug so handles and third-party URLs stay out of source. The mapping `slug -> environment variable name` lives in [`links.py`](links.py); those URLs are read from environment variables at runtime.

When a variable is not set, [`links.py`](links.py) falls back to built-in defaults for known slugs.

Set these in `.env` (Docker) or your shell (local dev). Each value should be the full `https://...` URL:

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

See [`.env.example`](.env.example) for a template.

## Optional static export

```bash
export LINK_CONTACT_GITHUB="https://example.com/..."
# ... other LINK_* vars
python build_static.py
```

Output lands in `dist/`. CI uses the same command for production.

## Security posture

- Markdown bodies are converted to HTML with Python-Markdown, then sanitized with **`nh3`** (restricted tags/attributes and URL schemes) before templates render them.
- Every served page sets a strict `Content-Security-Policy` meta tag (`default-src 'none'`, `script-src 'none'`, `style-src 'self'`, etc.).
- Slug-based outbound URLs are resolved from env vars (or safe defaults in `links.py`).
- The Flask runtime adds defence-in-depth response headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP).
- `safe_http_url` rejects any non-`http(s)` scheme before it reaches the redirect template.
- Keep the repo **private** on GitHub if you do not want source visible; `.env` is gitignored and should never be committed.
