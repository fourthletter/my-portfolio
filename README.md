# Diluong Portfolio

Minimal modern portfolio built with Next.js App Router and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` - Home
- `/about` - About
- `/projects` - Projects

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repo.
3. Keep the default framework as **Next.js** and deploy.
4. In the Vercel project, go to **Settings > Domains**.
5. (Optional) Add your custom domain in **Settings > Domains**.
6. If using a custom domain, add the DNS records Vercel provides.

## Production Notes

- Root sitemap is auto-generated at `/sitemap.xml` from `app/sitemap.ts`.
- Set your domain in `.env` using `SITE_URL=http://localhost:3000` (see `.env.example`).
- `metadataBase` and `robots.txt` use `SITE_URL` and fall back to the deployed Vercel URL.
- SEO files are included:
  - `app/sitemap.ts`
  - `app/robots.ts`
