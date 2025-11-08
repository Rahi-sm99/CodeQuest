"use client"

import { useEffect, useState } from "react"

export function EpicLoadingScreen() {
  const [dots, setDots] = useState("")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 30
        return next > 90 ? 90 : next
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center overflow-hidden z-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Center Loading Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Gaming Title with Glitch */}
        <div className="space-y-4">
          <div
            className="text-6xl font-gaming glow-text animate-pulse-glow"
            style={{ textShadow: "0 0 30px rgba(0, 255, 136, 0.8)" }}
          >
            INITIALIZING
          </div>
          <div className="text-4xl animate-bounce-hard">🎮</div>
        </div>

        {/* Loading Text with Animated Dots */}
        <div className="text-primary font-pixel text-lg glow-text animate-pulse-glow">ENTERING THE ARENA{dots}</div>

        {/* Animated Loading Bar */}
        <div className="w-64 mx-auto">
          <div
            className="pixel-border bg-card/50 p-1 overflow-hidden"
            style={{ boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)" }}
          >
            <div
              className="h-6 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.8), inset 0 0 10px rgba(255, 0, 110, 0.3)",
              }}
            />
          </div>
          <div className="text-primary text-xs font-pixel mt-2 glow-text">{Math.floor(progress)}%</div>
        </div>

        {/* Loading Messages */}
        <div className="space-y-2 text-xs text-accent font-pixel animate-bounce">
          <p>⚙️ Loading DSA Challenges...</p>
          <p>🔧 Compiling Code Executor...</p>
          <p>✨ Preparing Your Arena...</p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-2 h-2 bg-primary animate-pulse" style={{ boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)" }} />
          <div
            className="w-2 h-2 bg-accent animate-pulse"
            style={{ boxShadow: "0 0 10px rgba(255, 0, 110, 0.8)", animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-primary animate-pulse"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)", animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(0px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
