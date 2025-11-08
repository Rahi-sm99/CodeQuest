"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "./auth-provider"

export function OnboardingModal() {
  const [name, setName] = useState("")
  const [language, setLanguage] = useState("python")
  const { updateProfile, completeOnboarding } = useAuth()

  const handleComplete = () => {
    if (name.trim()) {
      updateProfile(name, language)
      completeOnboarding()
    }
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 bg-card/60 border-primary">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-gaming text-white mb-2">Welcome to CodeQuest</h2>
          <p className="text-muted-foreground font-pixel">Let's personalize your adventure</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-gaming text-white mb-2">What should we call you?</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-input border-primary/50 text-foreground pixel-border font-pixel text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-gaming text-white mb-2">Preferred Programming Language</label>
            <div className="grid grid-cols-2 gap-3">
              {["python", "javascript", "java", "cpp"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`p-4 rounded pixel-border font-gaming text-sm transition-all ${
                    language === lang
                      ? "bg-primary/30 border-primary text-primary"
                      : "bg-card/30 border-muted text-muted hover:border-primary/50"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleComplete}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-gaming font-bold py-3 text-lg"
          >
            Start My Journey
          </Button>
        </div>
      </Card>
    </div>
  )
}
