"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TUTORIAL_STEPS } from "@/lib/tutorial-steps"
import { Progress } from "@/components/ui/progress"

interface TutorialOverlayProps {
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
}

export function TutorialOverlay({ isActive, onComplete, onSkip }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isActive])

  if (!isVisible) return null

  const step = TUTORIAL_STEPS[currentStep]
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    onComplete()
  }

  const handleSkipTutorial = () => {
    setIsVisible(false)
    onSkip()
  }

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[60] animate-fade-in-scale" />

      {/* Tutorial card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg px-4 animate-slide-in-bounce">
  <Card className="p-6 bg-gradient-to-br from-primary/12 via-accent/12 to-psychic/12 border-primary pixel-border">
          <div className="space-y-4">
            {/* Icon and Title */}
            <div className="flex items-start gap-4">
              <span className="text-5xl animate-pikachu-bounce">{step.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-gaming text-primary glow-text mb-2">{step.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-pixel text-muted">
                  STEP {currentStep + 1} OF {TUTORIAL_STEPS.length}
                </span>
                <span className="text-xs font-pixel text-accent">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <Button
                onClick={handleSkipTutorial}
                variant="outline"
                className="pixel-border border-muted text-muted hover:border-primary hover:text-primary font-pixel text-xs bg-transparent"
              >
                SKIP
              </Button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="pixel-border border-primary/50 text-foreground hover:border-primary font-pixel text-xs bg-transparent"
                  >
                    ← BACK
                  </Button>
                )}
                <Button onClick={handleNext} className="pokemon-button text-primary-foreground font-pixel text-xs px-6">
                  {currentStep < TUTORIAL_STEPS.length - 1 ? "NEXT →" : "FINISH"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Decorative orb (replaces pokeball) */}
        <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 border-2 border-primary-foreground opacity-30 animate-spin pointer-events-none" />
      </div>
    </>
  )
}
