import { NextRequest } from "next/server"

async function renderHtml(body: string) {
  return `<!doctype html><html><head><meta charset="utf-8" /></head><body>${body}</body></html>`
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  // If the developer configured GitHub to use /api/auth/callback as the
  // callback path, forward this request to the GitHub callback handler so
  // the GitHub token-exchange logic runs. This opt-in is controlled by
  // NEXT_PUBLIC_GITHUB_CALLBACK_PATH to avoid interfering with Auth0 flows.
  const githubCallbackPath = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_PATH || "/api/auth/callback/github"
  if (githubCallbackPath === "/api/auth/callback") {
    const search = url.search || ""
    return new Response(null, { status: 302, headers: { Location: `/api/auth/callback/github${search}` } })
  }
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
  const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  if (error) {
    const html = await renderHtml(`<h2>Auth Error</h2><pre>${error}</pre>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 400 })
  }

  if (!code) {
    const html = await renderHtml(`<h2>Missing code</h2><p>No authorization code was returned by the identity provider.</p>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 400 })
  }

  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
    const html = await renderHtml(`<h2>Server not configured</h2><p>Set NEXT_PUBLIC_AUTH0_DOMAIN, NEXT_PUBLIC_AUTH0_CLIENT_ID and AUTH0_CLIENT_SECRET on the server.</p>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 500 })
  }

  try {
    const tokenRes = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: `${BASE_URL}/api/auth/callback`,
      }),
    })

    if (!tokenRes.ok) {
      const text = await tokenRes.text()
      const html = await renderHtml(`<h2>Token exchange failed</h2><pre>${text}</pre>`)
      return new Response(html, { headers: { "Content-Type": "text/html" }, status: 502 })
    }

    const tokens = await tokenRes.json()
    const accessToken = tokens.access_token
    const idToken = tokens.id_token

    // Fetch profile
    const userRes = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const user = userRes.ok ? await userRes.json() : null

    // Post message back to the opener window and close popup
    const payload = { type: "auth0-callback", accessToken, idToken, user }
    const escaped = JSON.stringify(payload).replace(/</g, "\\u003c")

    const html = await renderHtml(`<script>try{window.opener && window.opener.postMessage(${escaped}, window.location.origin);}catch(e){}window.close();</script>`)

    return new Response(html, { headers: { "Content-Type": "text/html" } })
  } catch (err) {
    const html = await renderHtml(`<h2>Server error</h2><pre>${String(err)}</pre>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 500 })
  }
}
