import { NextRequest } from "next/server"

async function renderHtml(body: string) {
  return `<!doctype html><html><head><meta charset="utf-8" /></head><body>${body}</body></html>`
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const githubCallbackPath = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_PATH || "/api/auth/callback/github"

  if (error) {
    const html = await renderHtml(`<h2>Auth Error</h2><pre>${error}</pre>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 400 })
  }

  if (!code) {
    const html = await renderHtml(`<h2>Missing code</h2><p>No authorization code was returned.</p>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 400 })
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    const html = await renderHtml(`<h2>Server not configured</h2><p>Set NEXT_PUBLIC_GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET on the server.</p>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 500 })
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        // Ensure the redirect_uri matches what was sent to GitHub when initiating
        // the flow. This can be overridden with NEXT_PUBLIC_GITHUB_CALLBACK_PATH.
        redirect_uri: `${BASE_URL}${githubCallbackPath}`,
      }),
    })

    const tokenBody = await tokenRes.text()
    let tokens: any = null
    try {
      tokens = JSON.parse(tokenBody)
    } catch (e) {
      // parsing failed — keep raw body
    }

    if (!tokenRes.ok || !tokens || !tokens.access_token) {
      const bodyDisplay = tokens ? JSON.stringify(tokens, null, 2) : tokenBody
      const html = await renderHtml(`<h2>Token exchange failed</h2><pre>${bodyDisplay}</pre>`)
      return new Response(html, { headers: { "Content-Type": "text/html" }, status: 502 })
    }

    const accessToken = tokens.access_token

    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/user`, {
      headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github.v3+json" },
    })
    const user = userRes.ok ? await userRes.json() : null

    const payload = { type: "github-auth-success", accessToken, user }
    const escaped = JSON.stringify(payload).replace(/</g, "\\u003c")

    const html = await renderHtml(`<script>try{window.opener && window.opener.postMessage(${escaped}, window.location.origin);}catch(e){}window.close();</script>`)

    return new Response(html, { headers: { "Content-Type": "text/html" } })
  } catch (err) {
    const html = await renderHtml(`<h2>Server error</h2><pre>${String(err)}</pre>`)
    return new Response(html, { headers: { "Content-Type": "text/html" }, status: 500 })
  }
}
