"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PokemonBadgeUnlockProps {
  badgeName: string
  badgeEmoji: string
  description: string
  onClose: () => void
}

export function PokemonBadgeUnlock({ badgeName, badgeEmoji, description, onClose }: PokemonBadgeUnlockProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 font-pixel">
      {/* Pokemon sparkle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <Card
        className={`relative z-10 p-10 gradient-psychic pixel-border text-center max-w-md transition-all duration-700 ${
          animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="text-8xl mb-6 animate-bounce">{badgeEmoji}</div>

        <h2 className="text-3xl font-gaming text-white mb-4 text-glow-electric">NEW BADGE UNLOCKED!</h2>

        <h3 className="text-2xl font-bold text-electric mb-4 text-glow-electric">{badgeName}</h3>

        <p className="text-sm text-white/90 mb-6 leading-relaxed">{description}</p>

        <Button
          onClick={onClose}
          className="w-full gradient-electric text-slate-900 hover:opacity-90 pixel-border font-pixel text-xs py-3 hover-lift font-bold"
        >
          ► AWESOME! ◄
        </Button>
      </Card>
    </div>
  )
}
