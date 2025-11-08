"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { GAMING_REGIONS, getRegionProgress } from "@/lib/gaming-regions"
import { useState } from "react"
import { DSA_LEVELS } from "@/lib/dsa-levels"

interface RegionalCatalogProps {
  completedLevels: number[]
  currentLevel: number
  onSelectLevel: (level: number) => void
}

export function RegionalCatalog({ completedLevels, currentLevel, onSelectLevel }: RegionalCatalogProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  if (selectedRegion) {
    const region = GAMING_REGIONS.find((r) => r.id === selectedRegion)
    if (!region) return null

    const [start, end] = region.levelRange
    const regionLevels = DSA_LEVELS.filter((level) => level.id >= start && level.id <= end)

    return (
      <div className="space-y-4 font-pixel">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedRegion(null)}
            className="pixel-border border-primary/50 text-foreground hover:border-primary font-pixel text-xs"
          >
            BACK TO ZONES
          </Button>
        </div>

        <Card className={`p-4 bg-gradient-to-r ${region.bgGradient} pixel-border glow-primary`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-900 rounded rotate-45" />
            </div>
            <div>
              <h2 className="text-lg font-gaming text-white glow-text">{region.name}</h2>
              <p className="text-xs text-primary-foreground/80">{region.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 pixel-border font-pixel text-xs">
              Boss: {region.gymLeader}
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 pixel-border font-pixel text-xs">
              Levels {region.levelRange[0]}-{region.levelRange[1]}
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {regionLevels.map((level) => {
            const isCompleted = completedLevels.includes(level.id)
            const isLocked = level.id > currentLevel && !isCompleted
            const isNext = level.id === currentLevel

            return (
              <Card
                key={level.id}
                className={`p-3 cursor-pointer pixel-border transition-all ${
                  isLocked
                    ? "bg-card/50 border-muted opacity-50"
                    : isNext
                      ? "bg-primary/20 border-primary glow-primary animate-pulse-glow"
                      : isCompleted
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-primary/30 hover:border-primary hover-lift"
                }`}
                onClick={() => !isLocked && onSelectLevel(level.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-gaming text-primary glow-text">LVL {level.id}</span>
                    {isCompleted && <span className="text-xs">✓</span>}
                    {isLocked && <span className="text-xs">🔒</span>}
                  </div>
                </div>
                <h3 className="font-gaming text-xs text-white mb-1 text-balance">{level.title}</h3>
                <p className="text-xs text-muted mb-2">{level.concept}</p>
                <div className="flex items-center justify-between">
                  <Badge
                    className={`text-xs pixel-border font-pixel ${
                      level.difficulty === "easy"
                        ? "bg-green-500/30 text-green-400 border-green-500"
                        : level.difficulty === "medium"
                          ? "bg-yellow-500/30 text-yellow-400 border-yellow-500"
                          : "bg-red-500/30 text-red-400 border-red-500"
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

  return (
    <div className="space-y-4 font-pixel">
      <div>
        <h2 className="text-xl font-gaming text-white glow-text mb-1">SKILL ZONES</h2>
        <p className="text-muted text-xs">Progress through difficulty zones and master DSA concepts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAMING_REGIONS.map((region) => {
          const progress = getRegionProgress(region.id, completedLevels)
          const [start, end] = region.levelRange
          const isUnlocked = currentLevel >= start
          const isCompleted = progress === 100

          return (
            <Card
              key={region.id}
              className={`p-4 cursor-pointer pixel-border transition-all ${
                !isUnlocked
                  ? "bg-card/50 border-muted opacity-50"
                  : isCompleted
                    ? `bg-gradient-to-br ${region.bgGradient} border-primary glow-primary`
                    : "bg-card border-primary/30 hover:border-primary hover-lift glow-primary"
              }`}
              onClick={() => isUnlocked && setSelectedRegion(region.id)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-slate-900 rounded rotate-45" />
                  </div>
                  {!isUnlocked && <span className="text-lg">🔒</span>}
                  {isCompleted && <span className="text-lg">👑</span>}
                </div>

                <div>
                  <h3 className="text-base font-gaming text-white glow-text mb-1">{region.name}</h3>
                  <p className="text-xs text-muted mb-2">{region.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted font-pixel">Progress</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30 pixel-border font-pixel text-xs">
                      {progress}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted font-pixel">Boss:</span>
                    <span className="text-white font-gaming glow-text">{region.gymLeader}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-muted font-pixel">Levels:</span>
                    <span className="text-white font-gaming glow-text">
                      {region.levelRange[0]}-{region.levelRange[1]}
                    </span>
                  </div>
                </div>

                {isUnlocked && !isCompleted && (
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-pixel text-xs mt-2">
                    ENTER ZONE
                  </Button>
                )}

                {isCompleted && (
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600 pixel-border font-pixel text-xs mt-2">
                    ✓ COMPLETED
                  </Button>
                )}

                {!isUnlocked && (
                  <Button disabled className="w-full pixel-border font-pixel text-xs mt-2 opacity-50">
                    🔒 LOCKED
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
