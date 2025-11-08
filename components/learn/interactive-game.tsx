"use client"

import { useState } from "react"
import type { TheoryLesson } from "@/lib/theory-content"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, X } from "lucide-react"
import { BFSGame } from "./games/bfs-game"
import { DFSGame } from "./games/dfs-game"
import { SortingGame } from "./games/sorting-game"

interface InteractiveGameProps {
  lesson: TheoryLesson
  onBack: () => void
}

export function InteractiveGame({ lesson, onBack }: InteractiveGameProps) {
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  // Determine which game to show based on lesson
  const getGameComponent = () => {
    const lessonId = lesson.id.toLowerCase()

    if (lessonId.includes("bfs")) {
      return <BFSGame onScore={(points) => setScore(score + points)} />
    } else if (lessonId.includes("dfs")) {
      return <DFSGame onScore={(points) => setScore(score + points)} />
    } else if (lessonId.includes("sort") || lessonId.includes("bubble") || lessonId.includes("merge")) {
      return <SortingGame sortType={lesson.title} onScore={(points) => setScore(score + points)} />
    } else {
      // Generic quiz game for other lessons
      return <GenericQuizGame lesson={lesson} onScore={(points) => setScore(score + points)} />
    }
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
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-yellow-500/20 border-2 border-yellow-400/50 rounded-lg">
            <span className="text-yellow-400 font-gaming text-sm">Score: {score}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-gaming text-white glow-text mb-2">{lesson.title} Game</h1>
        <p className="text-slate-300 text-base">Test your understanding through interactive challenges!</p>
      </div>

      {/* Game Content */}
      {getGameComponent()}
    </div>
  )
}

// Generic Quiz Game Component
function GenericQuizGame({ lesson, onScore }: { lesson: TheoryLesson; onScore: (points: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Generate questions based on lesson content
  const questions = [
    {
      question: `What is the main concept of ${lesson.title}?`,
      options: lesson.keyTakeaways.slice(0, 3),
      correct: 0,
    },
    {
      question: "Which statement is correct?",
      options: lesson.keyTakeaways.slice(0, 3),
      correct: 1,
    },
  ]

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)

    if (index === questions[currentQuestion].correct) {
      onScore(100)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <Card className="p-8 border-2 border-green-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-slate-900/80">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-gaming text-white mb-4">
            Question {currentQuestion + 1} / {questions.length}
          </h3>
          <p className="text-lg text-slate-200">{questions[currentQuestion].question}</p>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, i) => (
            <button
              key={i}
              onClick={() => !showResult && handleAnswer(i)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                showResult
                  ? i === questions[currentQuestion].correct
                    ? "bg-green-500/20 border-green-400 text-white"
                    : i === selectedAnswer
                      ? "bg-red-500/20 border-red-400 text-white"
                      : "bg-slate-800/30 border-slate-700 text-slate-400"
                  : "bg-slate-800/50 border-slate-600 text-slate-200 hover:border-yellow-400 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && i === questions[currentQuestion].correct && <Check className="w-5 h-5 text-green-400" />}
                {showResult && i === selectedAnswer && i !== questions[currentQuestion].correct && (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-bold"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete"}
          </Button>
        )}
      </div>
    </Card>
  )
}
