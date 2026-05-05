# Portfolio (Flask)

Personal portfolio rendered by a small Flask app and shipped to GitHub Pages as a static site via Frozen-Flask.

## Local development

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

## Outbound link configuration

Outbound links are referenced by a slug so handles and third-party URLs stay out of source. The mapping `slug -> environment variable name` lives in [`links.py`](links.py); the actual URLs are read from environment variables at build time.

When building locally (or if a variable is not set in CI) the redirect page renders a "Link unavailable" fallback instead of crashing.

### Required GitHub Actions secrets

Add these in **Settings -> Secrets and variables -> Actions**. Each value should be the full `https://...` URL:

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

Optional:

- `SITE_DOMAIN` – custom domain to write into `dist/CNAME` (e.g. `example.com`). If unset, no CNAME file is written.

### Local builds with placeholders

```bash
export LINK_CONTACT_GITHUB="https://example.com/contact-github"
export LINK_CONTACT_LINKEDIN="https://www.linkedin.com/in/your-profile/"
# ... etc, or leave unset to render placeholder pages
python build_static.py
```

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which:

1. Installs dependencies from `requirements.txt`.
2. Runs `python build_static.py` with the link secrets injected as environment variables.
3. Optionally writes `dist/CNAME` from `SITE_DOMAIN`.
4. Uploads `dist/` as a Pages artifact and deploys it.

In **Settings -> Pages**, ensure **Source** is set to **GitHub Actions** and (if you set `SITE_DOMAIN`) configure the matching custom domain DNS at your provider.

## Security posture

- Every served page sets a strict `Content-Security-Policy` meta tag (`default-src 'none'`, `script-src 'none'`, `style-src 'self'`, etc.).
- Outbound URLs only leave the repository at build time via env vars.
- The Flask runtime adds defence-in-depth response headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP); those apply when running the app dynamically.
- `safe_http_url` rejects any non-`http(s)` scheme before it reaches the redirect template.
