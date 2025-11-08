"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function GitHubCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")

    if (code && window.opener) {
      fetch("/api/github/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            window.opener.postMessage(
              {
                type: "github-auth-success",
                username: data.username,
                accessToken: data.accessToken,
              },
              window.location.origin,
            )
            window.close()
          }
        })
        .catch((error) => {
          console.error("GitHub auth error:", error)
          window.close()
        })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="text-primary font-gaming text-2xl mb-4">Connecting to GitHub...</div>
        <p className="text-muted text-sm">Please wait while we complete the authorization</p>
      </div>
    </div>
  )
}
