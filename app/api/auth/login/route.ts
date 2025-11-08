import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider") || "google"

    const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
      return new NextResponse("Auth0 not configured on the server. Set NEXT_PUBLIC_AUTH0_DOMAIN and NEXT_PUBLIC_AUTH0_CLIENT_ID.", { status: 400 })
    }

    // If the caller requested GitHub, use the server-side GitHub flow instead
    // of asking Auth0 to handle a GitHub connection (which can be disabled).
    if (provider === "github") {
      const githubLogin = `${BASE_URL}/api/auth/github/login`
      return NextResponse.redirect(githubLogin)
    }

    const connection = provider === "google" ? "google-oauth2" : undefined
    // Use the Auth0-compatible callback path so requests match the Allowed Callback URLs
    // (some Auth0 apps were configured with /api/auth/callback/auth0)
    const redirectUri = `${BASE_URL}/api/auth/callback/auth0`

    const authUrl =
      `https://${AUTH0_DOMAIN}/authorize?` +
      `response_type=code&` +
      `client_id=${encodeURIComponent(AUTH0_CLIENT_ID)}&` +
      (connection ? `connection=${encodeURIComponent(connection)}&` : "") +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=openid%20profile%20email&` +
      `prompt=login`

    return NextResponse.redirect(authUrl)
  } catch (err) {
    return new NextResponse("Server error constructing Auth0 url", { status: 500 })
  }
}
