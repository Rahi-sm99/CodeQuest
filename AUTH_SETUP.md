# Auth & OAuth Setup (local dev)

This file documents how to configure Auth0 and GitHub OAuth for local development and which env vars the app expects.

## Env vars (create `.env.local` at project root)

# Public (client-safe) values
NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your_auth0_client_id_here
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_oauth_client_id_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Server-only secrets (DO NOT COMMIT)
AUTH0_CLIENT_SECRET=your_auth0_client_secret_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
JUDGE0_API_KEY=your_rapidapi_judge0_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_api_key_here

## Callback URLs (add these to the provider configuration)

### Auth0 Application allowed callbacks
- http://localhost:3000/api/auth/callback/auth0
- http://localhost:3000/api/auth/callback

### GitHub OAuth App (Authorized callback URL)
- http://localhost:3000/api/auth/github/callback

## How it works (short)
- Client opens `/api/auth/login?provider=...` (or `/api/auth/github/login`) in a popup.
- Server redirects to the provider's authorize URL with a server-side `redirect_uri` pointing back to our callback route.
- Provider redirects back with a `code` to `/api/auth/callback` (Auth0) or `/api/auth/github/callback` (GitHub).
- Server exchanges the code for tokens (server-only `AUTH0_CLIENT_SECRET` or `GITHUB_CLIENT_SECRET`).
- Callback handler posts a message back to the popup opener and closes the window.

## Notes
- Always rotate secrets if they were shared publicly.
- Restart the dev server after creating `.env.local`.
- For production, use secure secret storage (e.g. provider secret manager) and issue httpOnly session cookies rather than posting tokens to the client.
