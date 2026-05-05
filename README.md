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

## Deploy to Vercel (Flask Serverless)

This repo is configured for Vercel with:

- `api/index.py` as the Vercel Python entrypoint
- `vercel.json` route mapping for Flask + static assets
- `requirements.txt` for Python runtime dependencies

### Deploy steps

1. Push this project to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repository.
3. Keep framework preset as **Other** (or no framework), and keep defaults.
4. Deploy. Vercel will detect `api/index.py` and build Python runtime.
5. After first successful deploy, open the generated `.vercel.app` URL and verify:
   - `/`
   - `/about`
   - `/projects`
   - `/projects/esusu` (sample dynamic route)

### Connect `diluong.net`

1. In Vercel project settings, open **Domains**.
2. Add `diluong.net` and `www.diluong.net`.
3. In your DNS provider, set:
   - **A** record: host `@` -> `76.76.21.21`
   - **CNAME** record: host `www` -> `cname.vercel-dns.com`
4. Back in Vercel, wait for domain verification and TLS issuance.
5. Set `diluong.net` as primary domain and optionally redirect `www` to apex.

## Alternative WSGI deployment

If deploying outside Vercel (Render/Heroku/etc.), this repo also includes:

- `wsgi.py` as a WSGI entrypoint
- `Procfile` with `gunicorn wsgi:app`

Run with:

```bash
gunicorn wsgi:app
```
