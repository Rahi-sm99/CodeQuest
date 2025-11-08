# Deploying CodeQuest to Vercel

This document shows the exact, minimal steps to deploy this Next.js app to Vercel (no local npm required). It also lists the environment variables and OAuth callback URLs you must configure.

## 1 — Prepare repository

- If your code is not yet on GitHub, create a new repository on GitHub and upload the project using the web UI (Repository → Add file → Upload files). You can also push from a machine with git:

```powershell
git add -A
git commit -m "Prepare for deploy"
git push origin main
```

Do NOT commit `.env.local` or any secrets. If secrets were committed accidentally, rotate them in the provider dashboards (Auth0, GitHub, etc.).

## 2 — Minimal Vercel import (web UI)

1. Sign in at https://vercel.com and connect your GitHub account.
2. From the Vercel dashboard click "New Project" → Import Git Repository → choose this repository.
3. During import you'll be asked to add Environment Variables. Add the variables listed below.
4. Click Deploy. Vercel will build and provide a production URL.

## 3 — Environment variables (add these in Vercel Project → Settings → Environment Variables)

Public / client-safe (these are available in the browser):

- NEXT_PUBLIC_BASE_URL = https://<your-deploy-domain>
- NEXT_PUBLIC_AUTH0_DOMAIN = <your-auth0-domain> (example: dev-xxxx.us.auth0.com)
- NEXT_PUBLIC_AUTH0_CLIENT_ID = <auth0 client id>
- NEXT_PUBLIC_GITHUB_CLIENT_ID = <github client id>

Server-only (do NOT prefix with NEXT_PUBLIC_):

- AUTH0_CLIENT_SECRET = <auth0 client secret>
- GITHUB_CLIENT_SECRET = <github client secret>
- JUDGE0_API_KEY = <optional: judge0/rapidapi key>
- GOOGLE_GENERATIVE_AI_API_KEY = <optional: google/generative key>

Optional (only if you use a custom callback path):

- NEXT_PUBLIC_GITHUB_CALLBACK_PATH = /api/auth/callback/github

Notes:
- Keep server-only secrets in Vercel's env UI so they are never exposed to client-side code.

## 4 — OAuth provider configuration (must match exactly)

Auth0 (Application settings):

- Allowed Callback URLs:
  - https://<your-deploy-domain>/api/auth/callback
  - https://<your-deploy-domain>/api/auth/callback/auth0
- Allowed Web Origins:
  - https://<your-deploy-domain>
- Ensure the Auth0 Application has the appropriate social Connections enabled (Google etc.)

GitHub (Developer settings → OAuth Apps → your app):

- Authorization callback URL:
  - https://<your-deploy-domain>/api/auth/callback/github
  (must exactly match the redirect_uri the app sends; if you use `NEXT_PUBLIC_GITHUB_CALLBACK_PATH` set it accordingly)

## 5 — Quick verification steps

1. Visit your deployed site (production URL provided by Vercel).
2. Click "CONNECT TO GITHUB". The GitHub authorize popup should appear and then return to the site.
3. Click the Auth0 / Google login and verify the redirect flow returns to the app.

If something fails:
- Use the debug endpoint to verify the GitHub authorize URL being sent:
  - https://<your-deploy-domain>/api/auth/github/login?debug=1
- Check Vercel deployment logs (Project → Deployments → View Build / Function Logs).
- For Auth0 errors, check Auth0 Dashboard → Monitoring → Logs for the authentication attempt.

## 6 — Optional improvements (recommended)

- Use server-side httpOnly cookies for sessions instead of relying on postMessage + localStorage (more secure). I can implement this if you want.
- Add a CI check to ensure `.env.local` is not accidentally committed.

---

If you'd like I can create this project on your Vercel account (I can't do that from here), or walk you through the import step-by-step while you do it. Reply `walk me` and I'll guide you live through the Vercel web UI.
