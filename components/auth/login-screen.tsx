"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PokemonVideoBackground } from "@/components/backgrounds/pokemon-video-background"

const MOCK_CREDENTIALS = {
  username: "User123",
  password: "password12345",
}

interface LoginScreenProps {
  onLoginSuccess: () => void
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      onLoginSuccess()
    } else {
      setError("Invalid credentials! Try User123 / password12345")
      setUsername("")
      setPassword("")
    }

    setIsLoading(false)
  }

  return (
    <>
      <PokemonVideoBackground theme="meadow" />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="clean-card p-8">
            <div className="text-center mb-8">
              <img src="/pikachu-waving.jpg" alt="Pikachu" className="w-20 h-20 mx-auto mb-4 animate-float" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">CodeQuest</h1>
              <p className="text-gray-600">Learn DSA with Pokemon</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex items-center gap-2">
                <img src="/charmander.png" alt="Feature" className="w-6 h-6" />
                <span className="text-sm font-medium text-gray-800">100 Coding Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/playful-squirtle.png" alt="Feature" className="w-6 h-6" />
                <span className="text-sm font-medium text-gray-800">7 Pokemon Regions</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bulbasaur.png" alt="Feature" className="w-6 h-6" />
                <span className="text-sm font-medium text-gray-800">Earn Badges & XP</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="User123"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl text-lg transition-all hover:scale-105"
              >
                {isLoading ? "Loading..." : "Start Adventure"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Demo: Use <span className="font-semibold">User123</span> /{" "}
                <span className="font-semibold">password12345</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
