"use client"

import { useEffect, useState } from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface SparkleEffectProps {
  trigger: boolean
  count?: number
}

export function SparkleEffect({ trigger, count = 20 }: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    if (trigger) {
      const newSparkles: Sparkle[] = []
      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 1 + 1,
          delay: Math.random() * 0.5,
        })
      }
      setSparkles(newSparkles)

      const timer = setTimeout(() => {
        setSparkles([])
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [trigger, count])

  if (sparkles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-float-up"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <div
            className="text-secondary animate-sparkle"
            style={{
              fontSize: `${sparkle.size}px`,
            }}
          >
            ✨
          </div>
        </div>
      ))}
    </div>
  )
}
