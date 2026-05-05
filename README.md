# Di Luong Portfolio (Flask)

Portfolio rebuilt as a Python-powered Flask app with server-rendered templates and static assets.

## Local Development

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask --app app run
```

Open [http://localhost:5000](http://localhost:5000).

## Routes

- `/` - Home
- `/about` - Bio
- `/projects` - Projects
- `/projects/<slug>` - Project detail pages

## Deploy from GitHub to GitHub Pages

This repo deploys directly from GitHub Actions to GitHub Pages by:

- freezing Flask routes into static HTML (`build_static.py`)
- publishing the generated `dist/` folder
- writing a `CNAME` file for `diluong.net`

### Deploy steps

1. Push to `main`.
2. GitHub Actions runs `.github/workflows/deploy-pages.yml`.
3. Static files are generated and deployed to GitHub Pages automatically.

### Connect `diluong.net`

In your DNS provider, set:

- `A` record host `@` to:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `CNAME` record host `www` to `fourthletter.github.io`

Then in GitHub repository settings:

1. Open **Settings -> Pages**.
2. Ensure **Source** is **GitHub Actions**.
3. Confirm custom domain is `diluong.net` (workflow also writes `dist/CNAME`).
4. Enable **Enforce HTTPS** after DNS resolves.

## Alternative WSGI deployment

If deploying outside Vercel (Render/Heroku/etc.), this repo also includes:

- `wsgi.py` as a WSGI entrypoint
- `Procfile` with `gunicorn wsgi:app`

Run with:

```bash
gunicorn wsgi:app
```
