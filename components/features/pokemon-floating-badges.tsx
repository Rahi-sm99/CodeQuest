"use client"

import { useEffect, useState } from "react"

export function PokemonFloatingBadges() {
  const [badges, setBadges] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const emojis = ["⚡", "🔥", "💧", "🌿", "⭐", "✨", "💎", "🏆"]
      const newBadge = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }

      setBadges((prev) => [...prev.slice(-10), newBadge])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="absolute text-4xl animate-float-up opacity-20"
          style={{
            left: `${badge.x}px`,
            bottom: 0,
            animationDuration: "8s",
          }}
        >
          {badge.emoji}
        </div>
      ))}
    </div>
  )
}
