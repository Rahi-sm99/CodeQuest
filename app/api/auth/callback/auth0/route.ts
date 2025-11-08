import { NextRequest, NextResponse } from "next/server"

// This route exists to support Auth0 apps that were configured with
// redirect_uri = /api/auth/callback/auth0. It forwards the full query
// string to the primary callback handler at /api/auth/callback so the
// existing token-exchange logic can run.

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const search = url.search || ""
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const target = `${base}/api/auth/callback${search}`
    return NextResponse.redirect(target)
  } catch (err) {
    return new NextResponse("Callback forward failed", { status: 500 })
  }
}
