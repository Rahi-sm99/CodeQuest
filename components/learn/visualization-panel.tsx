"use client"

import { useState, useEffect } from "react"
import type { TheoryLesson } from "@/lib/theory-content"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"

interface VisualizationPanelProps {
  lesson: TheoryLesson
  onBack: () => void
}

export function VisualizationPanel({ lesson, onBack }: VisualizationPanelProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)

  useEffect(() => {
    if (isPlaying && currentStep < lesson.visualization.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (currentStep >= lesson.visualization.steps.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep, speed, lesson.visualization.steps.length])

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="text-slate-300 hover:text-yellow-400 hover:bg-slate-800/50 border-2 border-yellow-500/30 bg-slate-800/40"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lesson
        </Button>
        <h1 className="text-2xl font-gaming text-white glow-text">{lesson.title} Visualization</h1>
      </div>

      {/* Main Visualization Area */}
      <Card className="p-8 border-2 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-slate-900/80">
        <div className="space-y-6">
          {/* Visual Display */}
          <div className="relative h-96 bg-slate-950/50 rounded-lg border-2 border-purple-400/30 p-6 flex items-center justify-center">
            <img
              src={`/.jpg?height=400&width=800&query=${lesson.title} step ${currentStep + 1} algorithm visualization animated`}
              alt={`Step ${currentStep + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute top-4 right-4 px-4 py-2 bg-purple-500/90 rounded-lg text-white font-gaming text-sm">
              Step {currentStep + 1} / {lesson.visualization.steps.length}
            </div>
          </div>

          {/* Current Step Description */}
          <div className="p-6 bg-purple-500/10 rounded-lg border-2 border-purple-400/50">
            <h3 className="text-lg font-gaming text-white mb-3">Current Step</h3>
            <p className="text-slate-200 text-base leading-relaxed">{lesson.visualization.steps[currentStep]}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-slate-800 hover:bg-slate-700 border-slate-600 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold disabled:opacity-30"
            >
              Previous
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Play
                </>
              )}
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(lesson.visualization.steps.length - 1, currentStep + 1))}
              disabled={currentStep === lesson.visualization.steps.length - 1}
              className="bg-green-500 hover:bg-green-600 text-black font-bold disabled:opacity-30"
            >
              Next
            </Button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-slate-300 text-sm">Speed:</span>
            <div className="flex gap-2">
              {[2000, 1000, 500].map((s) => (
                <Button
                  key={s}
                  onClick={() => setSpeed(s)}
                  variant={speed === s ? "default" : "outline"}
                  size="sm"
                  className={speed === s ? "bg-purple-500" : "bg-slate-800 border-slate-600"}
                >
                  {s === 2000 ? "Slow" : s === 1000 ? "Normal" : "Fast"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* All Steps Overview */}
      <Card className="p-6 border-2 border-slate-600/30 bg-slate-900/60">
        <h3 className="text-lg font-gaming text-white mb-4">All Steps</h3>
        <div className="space-y-2">
          {lesson.visualization.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                i === currentStep
                  ? "bg-purple-500/20 border-purple-400 text-white"
                  : "bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-sm">{i + 1}.</span>
                <span className="flex-1 text-sm">{step}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
