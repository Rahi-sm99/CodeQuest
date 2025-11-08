"use client"

import { useEffect, useState } from "react"

export function WelcomeAnimation() {
  const [showRobot, setShowRobot] = useState(false)
  const [robotPos, setRobotPos] = useState(-100)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowRobot(true), 300)

    const timer2 = setInterval(() => {
      setRobotPos((prev) => {
        const newPos = prev + 5
        return newPos > 120 ? -100 : newPos
      })
    }, 30)

    const timer3 = setTimeout(() => setShowMessage(true), 1200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer3)
      clearInterval(timer2)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 relative overflow-hidden font-pixel">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Welcome Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-gaming text-primary glow-text animate-pulse-glow">WELCOME TO CODEQUEST</h1>
          <p className="text-xl text-accent animate-bounce-hard">🎮 YOUR DSA LEARNING QUEST BEGINS 🎮</p>
        </div>

        {/* Robot Animation */}
        <div className="relative h-32 flex items-center justify-center overflow-hidden">
          <div
            className="text-6xl transition-all duration-75"
            style={{
              transform: `translateX(${robotPos}%)`,
              opacity: showRobot ? 1 : 0,
            }}
          >
            🤖
          </div>
        </div>

        {/* Message with animation */}
        {showMessage && (
          <div className="space-y-6 animate-fade-in">
            <div className="pixel-border bg-card/80 p-6 glow-primary mx-auto max-w-xl">
              <p className="text-lg text-primary mb-3">HEY THERE, PLAYER! 👋</p>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                I'm your AI companion! Ready to embark on an epic journey through 100 challenging levels?
              </p>
              <p className="text-xs text-accent">Let's master DSA together and level up your coding skills!</p>
            </div>

            {/* Fun stats preview */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="pixel-border bg-card/50 p-4 glow-primary text-center">
                <div className="text-3xl mb-2">100</div>
                <div className="text-xs text-primary">LEVELS</div>
              </div>
              <div className="pixel-border bg-card/50 p-4 glow-accent text-center">
                <div className="text-3xl mb-2">7</div>
                <div className="text-xs text-accent">LANGUAGES</div>
              </div>
              <div className="pixel-border bg-card/50 p-4 glow-primary text-center">
                <div className="text-3xl mb-2">∞</div>
                <div className="text-xs text-primary">GROWTH</div>
              </div>
            </div>

            {/* Loading indicator */}
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
