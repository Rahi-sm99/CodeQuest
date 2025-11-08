import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider") || "github"

    const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ""
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    if (!GITHUB_CLIENT_ID) {
      return new NextResponse("GitHub client id missing. Set NEXT_PUBLIC_GITHUB_CLIENT_ID in .env.local", { status: 500 })
    }

  // Allow the callback path to be overridden by an env var so it matches the
  // callback URL configured in the GitHub OAuth app (avoids mismatch errors).
  const githubCallbackPath = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_PATH || "/api/auth/callback/github"
  const redirectUri = `${BASE_URL}${githubCallbackPath}`
    const scope = encodeURIComponent("repo user")

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
      GITHUB_CLIENT_ID,
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`

    // Debug support: if caller includes ?debug=1 return the URL instead of
    // redirecting so you can inspect the exact redirect_uri being sent to GitHub.
    const debug = searchParams.get("debug")
    if (debug === "1") {
      return NextResponse.json({ authUrl, redirectUri })
    }

    return NextResponse.redirect(authUrl)
  } catch (err) {
    return new NextResponse("Failed to construct GitHub authorize url", { status: 500 })
  }
}
