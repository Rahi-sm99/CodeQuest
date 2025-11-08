"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DSA_LEVELS } from "@/lib/dsa-levels"
import { useState } from "react"
import { RegionalCatalog } from "./regional-catalog"

interface LevelsBrowserProps {
  completedLevels: number[]
  currentLevel: number
  onSelectLevel: (level: number) => void
}

const CONCEPTS = [
  "All",
  "Basics",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Advanced",
]

export function LevelsBrowser({ completedLevels, currentLevel, onSelectLevel }: LevelsBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConcept, setSelectedConcept] = useState("All")
  const [viewMode, setViewMode] = useState<"regional" | "list">("regional")

  const filteredLevels = DSA_LEVELS.filter((level) => {
    const matchesSearch = level.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesConcept = selectedConcept === "All" || level.concept === selectedConcept
    return matchesSearch && matchesConcept
  })

  if (viewMode === "regional") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-gaming text-white glow-text mb-2">COURSE CATALOG</h2>
            <p className="text-muted text-sm font-pixel">Choose your learning path</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
            className="pixel-border border-primary/50 text-foreground hover:border-primary font-pixel text-xs"
          >
            📋 LIST VIEW
          </Button>
        </div>
        <RegionalCatalog completedLevels={completedLevels} currentLevel={currentLevel} onSelectLevel={onSelectLevel} />
      </div>
    )
  }

  return (
    <div className="space-y-6 font-pixel">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-gaming text-white glow-text mb-2">ALL LEVELS</h2>
          <p className="text-muted text-sm">Complete 100 levels and master DSA</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setViewMode("regional")}
          className="pixel-border border-primary/50 text-foreground hover:border-primary font-pixel text-xs"
        >
          🗺️ REGIONAL VIEW
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search levels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-input border-primary/50 text-foreground placeholder:text-muted pixel-border font-pixel text-xs"
      />

      <div className="flex flex-wrap gap-2">
        {CONCEPTS.map((concept) => (
          <Button
            key={concept}
            variant={selectedConcept === concept ? "default" : "outline"}
            onClick={() => setSelectedConcept(concept)}
            className={`text-xs font-pixel pixel-border hover-lift ${
              selectedConcept === concept
                ? "bg-primary text-primary-foreground"
                : "border-primary/50 text-foreground hover:border-primary"
            }`}
          >
            {concept}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevels.map((level) => {
          const isCompleted = completedLevels.includes(level.id)
          const isLocked = level.id > currentLevel && !isCompleted
          const isNext = level.id === currentLevel

          return (
            <Card
              key={level.id}
              className={`p-4 cursor-pointer pixel-border ${
                isLocked
                  ? "bg-card/50 border-muted opacity-50"
                  : isNext
                    ? "bg-primary/20 border-primary glow-primary"
                    : isCompleted
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-primary/30 hover:border-primary hover-lift"
              }`}
              onClick={() => !isLocked && onSelectLevel(level.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-gaming text-white glow-text">LVL {level.id}</span>
                  {isCompleted && <span className="text-lg animate-bounce-hard">✅</span>}
                  {isLocked && <span className="text-lg">🔒</span>}
                </div>
              </div>
              <h3 className="font-gaming text-sm text-white mb-1">{level.title}</h3>
              <p className="text-xs text-muted mb-3">{level.concept}</p>
              <div className="flex items-center justify-between">
                <Badge
                  className={`text-xs pixel-border font-pixel ${
                    level.difficulty === "easy"
                      ? "bg-primary/30 text-primary border-primary"
                      : level.difficulty === "medium"
                        ? "bg-accent/30 text-accent border-accent"
                        : "bg-destructive/30 text-destructive border-destructive"
                  }`}
                >
                  {level.difficulty.toUpperCase()}
                </Badge>
                <span className="text-accent font-gaming text-xs glow-text">{level.xp} XP</span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
