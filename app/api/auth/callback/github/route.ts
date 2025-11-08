import { NextRequest, NextResponse } from "next/server"

// Forwarder: accepts requests sent to /api/auth/callback/github and forwards them
// to the canonical GitHub callback handler at /api/auth/github/callback preserving
// the query string. This lets you register the callback in GitHub as
// http://localhost:3000/api/auth/callback/github without changing server code.

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const search = url.search || ""
    return NextResponse.redirect(`/api/auth/github/callback${search}`)
  } catch (err) {
    return new NextResponse("Callback forward failed", { status: 500 })
  }
}
