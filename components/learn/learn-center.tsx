"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Eye, Gamepad2 } from "lucide-react"
import { TheoryViewer } from "./theory-viewer"
import { VisualizationPanel } from "./visualization-panel"
import { InteractiveGame } from "./interactive-game"
import type { TheoryLesson } from "@/lib/theory-content"
import { THEORY_LESSONS } from "@/lib/theory-content"

interface LearnCenterProps {
  onBack: () => void
}

type ViewMode = "overview" | "lesson" | "visualization" | "game"
type FilterCategory = "all" | "Algorithms" | "Data Structures" | "Graphs" | "Sorting"

export function LearnCenter({ onBack }: LearnCenterProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("overview")
  const [selectedLesson, setSelectedLesson] = useState<TheoryLesson | null>(null)
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all")

  const categories: FilterCategory[] = ["all", "Algorithms", "Data Structures", "Graphs", "Sorting"]

  const filteredLessons =
    filterCategory === "all"
      ? THEORY_LESSONS
      : THEORY_LESSONS.filter((lesson) => {
          if (filterCategory === "Algorithms") return lesson.concept === "Algorithms"
          if (filterCategory === "Data Structures") return lesson.concept === "Data Structures"
          if (filterCategory === "Graphs") return lesson.concept === "Graphs"
          if (filterCategory === "Sorting") return lesson.concept === "Sorting"
          return true
        })

  const handleSelectLesson = (lesson: TheoryLesson) => {
    setSelectedLesson(lesson)
    setViewMode("lesson")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-400/50"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/50"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-400/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/50"
    }
  }

  if (viewMode === "lesson" && selectedLesson) {
    return (
      <TheoryViewer
        lesson={selectedLesson}
        onBack={() => setViewMode("overview")}
        onStartGame={() => setViewMode("game")}
        onViewVisualization={() => setViewMode("visualization")}
      />
    )
  }

  if (viewMode === "visualization" && selectedLesson) {
    return <VisualizationPanel lesson={selectedLesson} onBack={() => setViewMode("lesson")} />
  }

  if (viewMode === "game" && selectedLesson) {
    return <InteractiveGame lesson={selectedLesson} onBack={() => setViewMode("lesson")} />
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-gaming text-white mb-3 glow-text">LEARNING CENTER</h1>
        <p className="text-slate-300 text-base">
          Master DSA concepts through theory, visualizations, and interactive games
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filterCategory === category ? "default" : "outline"}
            onClick={() => setFilterCategory(category)}
            size="sm"
            className={
              filterCategory === category
                ? "bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-bold shadow-[0_0_15px_rgba(250,204,21,0.5)] border-2 border-yellow-400"
                : "text-slate-300 hover:text-yellow-400 hover:bg-slate-800/50 border-2 border-transparent hover:border-yellow-500/30 bg-slate-800/40"
            }
          >
            {category.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="p-5 bg-slate-900/60 border-2 border-yellow-500/30 hover:border-yellow-500 transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] cursor-pointer group"
            onClick={() => handleSelectLesson(lesson)}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <Badge className={`text-xs font-bold border ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty.toUpperCase()}
                </Badge>
                <Badge className="text-xs font-bold text-yellow-400 bg-yellow-400/20 border border-yellow-400/50">
                  {lesson.concept.toUpperCase()}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-lg font-gaming text-white group-hover:text-yellow-400 transition-colors">
                {lesson.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-300 line-clamp-2">{lesson.theory.split("\n")[0]}</p>

              {/* Features */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <BookOpen className="w-3 h-3" />
                  <span>Theory</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Eye className="w-3 h-3" />
                  <span>Viz</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Code className="w-3 h-3" />
                  <span>Code</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Gamepad2 className="w-3 h-3" />
                  <span>Game</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Back Button */}
      <Button
        onClick={onBack}
        className="bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-bold"
      >
        Back to Dashboard
      </Button>
    </div>
  )
}
