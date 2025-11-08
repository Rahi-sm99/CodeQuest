"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { WEEKLY_TASKS, getWeeklyTaskProgress } from "@/lib/daily-tasks"
import { getTaskProgress, updateWeeklyTaskProgress } from "@/lib/task-storage"
import { useState, useEffect } from "react"

interface WeeklyTasksProps {
  completedLevels: number[]
  userXP: number
}

export function WeeklyTasks({ completedLevels, userXP }: WeeklyTasksProps) {
  const [taskProgress, setTaskProgress] = useState(getTaskProgress())

  // Update task progress
  useEffect(() => {
    const newProgress = getTaskProgress()
    WEEKLY_TASKS.forEach((task) => {
      const progress = getWeeklyTaskProgress(task, completedLevels, userXP, newProgress.currentStreak)
      const completed = progress >= task.requirement

      if (newProgress.weeklyTasks[task.id]?.completed !== completed) {
        updateWeeklyTaskProgress(task.id, progress, completed)
      }
    })
    setTaskProgress(getTaskProgress())
  }, [completedLevels, userXP])

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="font-gaming text-xl text-primary glow-text">🎯 WEEKLY TASKS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WEEKLY_TASKS.map((task) => {
          const progress = getWeeklyTaskProgress(task, completedLevels, userXP, taskProgress.currentStreak)
          const isCompleted = progress >= task.requirement
          const progressPercent = (progress / task.requirement) * 100

          return (
            <Card
              key={task.id}
              className={`pixel-border p-4 transition-all ${
                isCompleted ? "glow-primary bg-primary/10" : "glow-accent bg-card/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-float">{task.icon}</span>
                  <div>
                    <h4 className="font-pixel text-sm text-primary">{task.title}</h4>
                    <p className="text-xs text-muted font-pixel">{task.description}</p>
                  </div>
                </div>
                {isCompleted && (
                  <Badge className="pixel-border bg-primary text-primary-foreground font-pixel text-xs animate-pulse-glow">
                    ✓
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-pixel">
                  <span className="text-muted">Progress:</span>
                  <span className="text-primary glow-text">
                    {progress}/{task.requirement}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-accent font-gaming text-sm animate-pulse-glow">+{task.reward} XP</span>
                  <span className="text-xs text-muted font-pixel">{Math.round(progressPercent)}% Complete</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
