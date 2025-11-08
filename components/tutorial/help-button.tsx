"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface HelpButtonProps {
  onStartTutorial: () => void
}

export function HelpButton({ onStartTutorial }: HelpButtonProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Help menu */}
      {showMenu && (
        <Card className="absolute bottom-16 right-0 p-4 w-64 bg-card border-primary pixel-border glow-primary animate-fade-in-scale">
          <h4 className="text-sm font-gaming text-primary glow-text mb-3">HELP & SUPPORT</h4>
          <div className="space-y-2">
            <button
              onClick={() => {
                onStartTutorial()
                setShowMenu(false)
              }}
              className="w-full text-left px-3 py-2 rounded pixel-border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-xs font-pixel text-foreground"
            >
              📚 Restart Tutorial
            </button>
            <button className="w-full text-left px-3 py-2 rounded pixel-border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-xs font-pixel text-foreground">
              ❓ FAQ
            </button>
            <button className="w-full text-left px-3 py-2 rounded pixel-border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-xs font-pixel text-foreground">
              💬 Community
            </button>
            <button className="w-full text-left px-3 py-2 rounded pixel-border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-xs font-pixel text-foreground">
              📧 Contact Support
            </button>
          </div>
        </Card>
      )}

      {/* Help button */}
      <Button
        onClick={() => setShowMenu(!showMenu)}
        className="w-14 h-14 rounded-full pokemon-button text-primary-foreground flex items-center justify-center text-2xl shadow-lg"
      >
        {showMenu ? "✕" : "?"}
      </Button>
    </div>
  )
}
