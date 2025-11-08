"use client"

import { useEffect } from "react"

export default function AuthCallback() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get("access_token")

      if (window.opener) {
        window.opener.postMessage(
          {
            type: "auth0-callback",
            accessToken,
          },
          window.location.origin,
        )
        window.close()
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-gaming text-lg">Completing sign in...</p>
      </div>
    </div>
  )
}
