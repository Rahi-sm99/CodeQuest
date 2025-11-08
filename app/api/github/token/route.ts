import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    const clientId = process.env.GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID"
    const clientSecret = process.env.GITHUB_CLIENT_SECRET || "YOUR_GITHUB_CLIENT_SECRET"

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })

      const userData = await userResponse.json()

      return NextResponse.json({
        username: userData.login,
        accessToken: tokenData.access_token,
      })
    }

    return NextResponse.json({ error: "Failed to get access token" }, { status: 400 })
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
