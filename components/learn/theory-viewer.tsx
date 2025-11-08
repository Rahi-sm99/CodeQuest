"use client"

import { useState } from "react"
import type { TheoryLesson } from "@/lib/theory-content"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Gamepad2, Trophy } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface TheoryViewerProps {
  lesson: TheoryLesson
  onBack: () => void
  onStartGame: () => void
  onViewVisualization: () => void
}

export function TheoryViewer({ lesson, onBack, onStartGame }: TheoryViewerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizComplete, setQuizComplete] = useState(false)
  const { user, updateUserProgress } = useAuth()

  const difficultyColors = {
    beginner: "from-green-500/20 to-green-600/20 border-green-500/50",
    intermediate: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50",
    advanced: "from-red-500/20 to-red-600/20 border-red-500/50",
  }

  const conceptStyles: Record<string, { bg: string; icon: string; text: string }> = {
    Basics: { bg: "from-blue-500/20 to-cyan-500/20", icon: "CODE", text: "Programming Fundamentals" },
    "Control Flow": { bg: "from-purple-500/20 to-pink-500/20", icon: "LOOP", text: "Decision Making & Loops" },
    Functions: { bg: "from-green-500/20 to-emerald-500/20", icon: "FUNC", text: "Reusable Code Blocks" },
    "Data Structures": { bg: "from-orange-500/20 to-red-500/20", icon: "DATA", text: "Organizing Your Data" },
    Algorithms: { bg: "from-yellow-500/20 to-amber-500/20", icon: "ALGO", text: "Problem Solving Methods" },
    Sorting: { bg: "from-teal-500/20 to-cyan-500/20", icon: "SORT", text: "Arranging Data" },
    "Linked Lists": { bg: "from-indigo-500/20 to-purple-500/20", icon: "LINK", text: "Connected Nodes" },
    "Stacks & Queues": { bg: "from-pink-500/20 to-rose-500/20", icon: "FIFO", text: "LIFO & FIFO Structures" },
    Trees: { bg: "from-lime-500/20 to-green-500/20", icon: "TREE", text: "Hierarchical Data" },
    Graphs: { bg: "from-violet-500/20 to-fuchsia-500/20", icon: "GRAPH", text: "Network Connections" },
    "Dynamic Programming": { bg: "from-amber-500/20 to-orange-500/20", icon: "DP", text: "Optimization Techniques" },
  }

  const getConceptCard = (concept: string) => {
    const style = conceptStyles[concept] || conceptStyles.Basics

    return (
      <div
        className={`w-full h-48 rounded-lg border-2 border-primary/30 bg-gradient-to-br ${style.bg} flex flex-col items-center justify-center p-6`}
      >
        <div className="text-4xl mb-3 font-gaming text-primary">{style.icon}</div>
        <h3 className="text-xl font-gaming text-white text-center">{style.text}</h3>
        <p className="text-sm text-muted-foreground mt-2">{concept}</p>
      </div>
    )
  }

  const quizQuestions = [
    {
      question: `What is the main purpose of ${lesson.concept}?`,
      options: [
        "To organize and store data efficiently",
        "To make code look better",
        "To slow down the program",
        "To confuse developers",
      ],
      correctAnswer: 0,
      xpReward: 25,
    },
    {
      question: "Which characteristic is most important for this concept?",
      options: ["Visual appearance", "Time and space complexity", "Number of lines of code", "Developer preference"],
      correctAnswer: 1,
      xpReward: 25,
    },
    {
      question: `In which scenario would you use ${lesson.concept}?`,
      options: [
        "When you want to avoid solving problems",
        "When you need efficient data operations",
        "When you want more bugs",
        "When you dislike optimization",
      ],
      correctAnswer: 1,
      xpReward: 30,
    },
    {
      question: "What should you consider when implementing this concept?",
      options: [
        "Performance and memory efficiency",
        "How fancy the code looks",
        "Using as many lines as possible",
        "Ignoring edge cases",
      ],
      correctAnswer: 0,
      xpReward: 20,
    },
  ]

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionIndex]: answerIndex }
    setSelectedAnswers(newAnswers)

    if (Object.keys(newAnswers).length === quizQuestions.length) {
      const totalCorrect = quizQuestions.filter((q, i) => newAnswers[i] === q.correctAnswer).length
      const earnedXP = quizQuestions
        .filter((q, i) => newAnswers[i] === q.correctAnswer)
        .reduce((sum, q) => sum + q.xpReward, 0)

      if (totalCorrect > 0) {
        setTimeout(() => {
          setQuizComplete(true)
          if (user) {
            updateUserProgress(user.xp + earnedXP, user.completedLevels)
          }
        }, 500)
      }
    }
  }

  const getAnswerClassName = (questionIndex: number, answerIndex: number) => {
    const isSelected = selectedAnswers[questionIndex] === answerIndex
    const question = quizQuestions[questionIndex]
    const isCorrect = answerIndex === question.correctAnswer
    const hasAnswered = selectedAnswers[questionIndex] !== undefined

    if (!hasAnswered) {
      return "bg-slate-800/30 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700/30"
    }

    if (isSelected && isCorrect) {
      return "bg-green-500/20 border-green-400 text-white"
    }

    if (isSelected && !isCorrect) {
      return "bg-red-500/20 border-red-400 text-white"
    }

    if (isCorrect && hasAnswered) {
      return "bg-green-500/10 border-green-500/50 text-green-400"
    }

    return "bg-slate-800/20 border-slate-700/50 text-slate-400"
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="text-slate-300 hover:text-yellow-400 hover:bg-slate-800/50 border-2 border-yellow-500/30 bg-slate-800/40 font-gaming"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learn
        </Button>
        <Button onClick={onStartGame} className="bg-green-500 hover:bg-green-600 text-white font-gaming">
          <Gamepad2 className="w-4 h-4 mr-2" />
          Play Game
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-gaming text-white">{lesson.title}</h1>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span
            className={`px-3 py-1.5 rounded-lg bg-gradient-to-br ${difficultyColors[lesson.difficulty]} text-xs font-gaming uppercase tracking-wide border-2`}
          >
            {lesson.difficulty}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 text-cyan-400 text-xs font-gaming">
            {lesson.concept}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-2 border-purple-500/50 text-purple-400 text-xs font-gaming">
            {lesson.language}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 text-primary text-xs font-gaming">
            {lesson.exerciseCount} Exercises
          </span>
        </div>
      </div>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/80 p-1 rounded-xl border-2 border-primary/30">
          <TabsTrigger
            value="theory"
            className="data-[state=active]:bg-primary data-[state=active]:text-black font-gaming rounded-lg transition-all text-xs"
          >
            Theory
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="data-[state=active]:bg-secondary data-[state=active]:text-black font-gaming rounded-lg transition-all text-xs"
          >
            Code
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white font-gaming rounded-lg transition-all text-xs"
          >
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="space-y-4 mt-6">
          <Card className="p-6 border-2 border-primary/30 hover:border-primary/60 transition-all bg-slate-800/60">
            <div className="prose prose-invert max-w-none">
              <div className="mb-6">{getConceptCard(lesson.concept)}</div>
              <pre className="whitespace-pre-wrap text-slate-200 leading-relaxed font-sans text-sm">
                {lesson.theory}
              </pre>
            </div>
          </Card>

          <Card className="p-6 border-2 border-green-500/30 transition-all bg-slate-800/60">
            <h3 className="text-base font-gaming text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {lesson.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="level-badge bg-green-500 text-white mt-0.5 w-6 h-6 text-xs font-gaming">{i + 1}</div>
                  <span className="text-slate-200 flex-1 leading-relaxed text-sm font-gaming">{takeaway}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <Card className="p-6 border-2 border-cyan-500/30 transition-all bg-slate-900/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-gaming text-white text-base">Code Example</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-gaming">
                {lesson.language}
              </span>
            </div>
            <pre className="overflow-x-auto">
              <code className="text-sm text-cyan-300 font-mono leading-relaxed">{lesson.codeExample}</code>
            </pre>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4 mt-6">
          <Card className="p-6 border-2 border-green-500/30 bg-slate-800/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-gaming text-white">Test Your Knowledge</h3>
              {quizComplete && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-400">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-gaming">Quiz Complete!</span>
                </div>
              )}
            </div>
            <p className="text-slate-300 mb-6 text-sm font-gaming">Answer correctly to earn XP for each question</p>

            <div className="space-y-6">
              {quizQuestions.map((quiz, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-gaming text-white text-base">
                      {qIndex + 1}. {quiz.question}
                    </h4>
                    <span className="px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-gaming whitespace-nowrap">
                      +{quiz.xpReward} XP
                    </span>
                  </div>
                  <div className="space-y-2">
                    {quiz.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={selectedAnswers[qIndex] !== undefined}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all font-gaming ${getAnswerClassName(qIndex, oIndex)}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                            {String.fromCharCode(65 + oIndex)}
                          </div>
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {quizComplete && (
              <div className="mt-6 p-4 rounded-lg bg-green-500/20 border-2 border-green-400">
                <p className="text-green-400 font-gaming text-center text-lg">
                  Excellent work! You earned{" "}
                  {quizQuestions
                    .filter((q, i) => selectedAnswers[i] === q.correctAnswer)
                    .reduce((sum, q) => sum + q.xpReward, 0)}{" "}
                  total XP
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
