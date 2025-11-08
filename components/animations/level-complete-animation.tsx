"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LevelCompleteAnimationProps {
  level: number
  xpEarned: number
  totalXP: number
  onContinue: () => void
}

export function LevelCompleteAnimation({ level, xpEarned, totalXP, onContinue }: LevelCompleteAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowConfetti(true), 200)
    const timer2 = setTimeout(() => setShowStats(true), 800)
    const timer3 = setTimeout(() => setShowButton(true), 1400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-pixel">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 20}px`,
                animationDelay: `${i * 0.03}s`,
              }}
            >
              {i % 5 === 0 ? "⚡" : i % 5 === 1 ? "🔥" : i % 5 === 2 ? "💧" : i % 5 === 3 ? "🌿" : "✨"}
            </div>
          ))}
        </div>
      )}

      {/* Celebration Card */}
      <Card className="relative z-10 p-10 gradient-psychic pixel-border glow-psychic text-center max-w-lg rounded-3xl">
        {/* Celebratory Emoji */}
  <div className="text-8xl mb-6 animate-scale-pulse">🏆</div>

        {/* Main Message */}
        <h2 className="text-4xl font-gaming text-electric glow-text mb-6 animate-pikachu-bounce">
          LEVEL {level} COMPLETE!
        </h2>

        {/* Stats Animation */}
        {showStats && (
          <div className="space-y-6 animate-fade-in-scale mb-8">
            <div className="gradient-electric pixel-border p-6 rounded-2xl">
              <div className="text-4xl text-slate-900 font-bold mb-2">
                <span className="animate-sparkle">+{xpEarned}</span> XP
              </div>
              <div className="text-sm text-slate-800 font-pixel">Experience Points Earned!</div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="gradient-fire pixel-border p-4 rounded-xl hover-lift">
                <div className="text-3xl mb-2 animate-pikachu-bounce">⭐</div>
                <div className="text-xs text-white">ACHIEVEMENT</div>
              </div>
              <div className="gradient-grass pixel-border p-4 rounded-xl hover-lift">
                <div className="text-3xl mb-2 animate-thunder-bolt">🔥</div>
                <div className="text-xs text-white">STREAK +1</div>
              </div>
              <div className="gradient-water pixel-border p-4 rounded-xl hover-lift">
                <div className="text-3xl mb-2 animate-sparkle">💎</div>
                <div className="text-xs text-white">BADGE</div>
              </div>
            </div>

            <div className="text-sm text-white/80">Total XP: {totalXP}</div>
          </div>
        )}

        {/* Continue Button */}
        {showButton && (
          <Button
            onClick={onContinue}
            className="w-full gradient-electric text-slate-900 hover:opacity-90 pixel-border font-pixel text-base py-6 hover-lift glow-electric font-bold animate-pulse-glow"
          >
            {level < 100 ? "► NEXT LEVEL ◄" : "🎮 YOU'RE A POKEMON MASTER! 🎮"}
          </Button>
        )}
      </Card>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes scale-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.95;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pikachu-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes thunder-bolt {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float-up {
          animation: float-up 2s linear infinite;
        }
        .animate-scale-pulse {
          animation: scale-pulse 1s ease-out;
        }
        .animate-pikachu-bounce {
          animation: pikachu-bounce 1s ease-in-out infinite;
        }
        .animate-thunder-bolt {
          animation: thunder-bolt 1s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 1s ease-in-out infinite;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
