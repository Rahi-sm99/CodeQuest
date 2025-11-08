"use client"

import { useEffect, useState } from "react"

interface PokeballTransitionProps {
  isActive: boolean
  onComplete?: () => void
}

export function PokeballTransition({ isActive, onComplete }: PokeballTransitionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 1400)
      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 flex items-center justify-center">
        {/* Main glowing orb */}
        <div className="relative flex items-center justify-center">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-indigo-400 shadow-2xl animate-orb-scale" />

          {/* Inner core */}
          <div className="absolute w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mix-blend-screen" />

          {/* Expanding rings */}
          <div className="absolute w-36 h-36 rounded-full border border-white/10 ring ring-white/5 animate-orb-ring" />
          <div className="absolute w-48 h-48 rounded-full border border-white/5 opacity-0 animate-orb-ring-slow" />
        </div>
      </div>

      <style jsx>{`
        @keyframes orb-scale {
          0% { transform: scale(0.6); opacity: 0.2; filter: blur(6px); }
          40% { transform: scale(1.05); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); opacity: 0.95; filter: blur(0px); }
        }

        @keyframes orb-ring {
          0% { transform: scale(0.9); opacity: 0.5; }
          70% { transform: scale(1.6); opacity: 0.08; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @keyframes orb-ring-slow {
          0% { transform: scale(1); opacity: 0.18; }
          80% { transform: scale(1.9); opacity: 0.02; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        .animate-orb-scale { animation: orb-scale 1.15s cubic-bezier(.2,.9,.3,1) forwards; }
        .animate-orb-ring { animation: orb-ring 1.15s ease-out forwards; }
        .animate-orb-ring-slow { animation: orb-ring-slow 1.4s ease-out forwards; }
      `}</style>
    </div>
  )
}
