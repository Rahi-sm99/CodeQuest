"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DAILY_CHALLENGES,
  getTodayChallenge,
  getChallengeProblems,
  isChallengeCompleted,
  type DailyChallenge as DailyChallengeType,
} from "@/lib/daily-tasks"
import { getTaskProgress, markDailyChallengeComplete } from "@/lib/task-storage"
import { useState, useEffect } from "react"

interface DailyChallengeProps {
  completedLevels: number[]
  onStartChallenge: (problemId: number) => void
}

const DIFFICULTY_COLORS = {
  easy: "bg-green-500/20 text-green-400 border-green-500",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
  hard: "bg-red-500/20 text-red-400 border-red-500",
  expert: "bg-purple-500/20 text-purple-400 border-purple-500",
}

export function DailyChallenge({ completedLevels, onStartChallenge }: DailyChallengeProps) {
  const [taskProgress, setTaskProgress] = useState(getTaskProgress())
  const todayChallenge = getTodayChallenge()

  const isTodayCompleted = isChallengeCompleted(todayChallenge, completedLevels)

  useEffect(() => {
    if (isTodayCompleted && !taskProgress.dailyChallenges[todayChallenge.id]?.completed) {
      const newProgress = markDailyChallengeComplete(todayChallenge.id)
      setTaskProgress(newProgress)
    }
  }, [isTodayCompleted, todayChallenge.id, taskProgress.dailyChallenges])

  const handleStartChallenge = (challenge: DailyChallengeType) => {
    const problems = getChallengeProblems(challenge)
    if (problems.length > 0) {
      onStartChallenge(problems[0].id)
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Streak Display */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 p-4 border-2 border-yellow-500/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
            <div>
              <h4 className="font-bold text-sm text-yellow-400">CURRENT STREAK</h4>
              <p className="text-2xl font-bold text-white">{taskProgress.currentStreak} DAYS</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">LONGEST STREAK</p>
            <p className="text-lg font-bold text-green-400">{taskProgress.longestStreak} DAYS</p>
          </div>
        </div>
      </Card>

      {/* Today's Challenge */}
      <div>
        <h3 className="font-bold text-xl text-yellow-400 mb-4">TODAY'S CHALLENGE</h3>
        <Card
          className={`p-6 transition-all hover:scale-[1.02] border-2 ${
            isTodayCompleted
              ? "bg-green-500/10 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              : "bg-slate-800/50 border-yellow-500/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 via-green-400 to-blue-400 animate-pulse" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-yellow-500 text-slate-900 font-bold border-0">{todayChallenge.day}</Badge>
                  <Badge className={`${DIFFICULTY_COLORS[todayChallenge.difficulty]} border-2 font-bold`}>
                    {todayChallenge.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <h4 className="font-bold text-lg text-white">{todayChallenge.concept}</h4>
                <p className="text-xs text-slate-400 mt-1">{todayChallenge.description}</p>
              </div>
            </div>
            {isTodayCompleted && (
              <Badge className="bg-green-500 text-white font-bold border-0 animate-pulse">COMPLETED</Badge>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress:</span>
              <span className="text-yellow-400 font-bold">
                {todayChallenge.problemIds.filter((id) => completedLevels.includes(id)).length}/
                {todayChallenge.problemIds.length} Problems
              </span>
            </div>
            <Progress
              value={
                (todayChallenge.problemIds.filter((id) => completedLevels.includes(id)).length /
                  todayChallenge.problemIds.length) *
                100
              }
              className="h-2"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold text-lg">+{todayChallenge.reward} XP</span>
                <span className="text-xs text-slate-400">Reward</span>
              </div>
              <Button
                onClick={() => handleStartChallenge(todayChallenge)}
                disabled={isTodayCompleted}
                className="bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-bold disabled:opacity-50"
              >
                {isTodayCompleted ? "COMPLETED" : "START"}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Overview */}
      <div>
        <h3 className="font-bold text-xl text-yellow-400 mb-4">WEEKLY CHALLENGES</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {DAILY_CHALLENGES.map((challenge) => {
            const isCompleted = isChallengeCompleted(challenge, completedLevels)
            const isToday = challenge.id === todayChallenge.id

            return (
              <Card
                key={challenge.id}
                className={`p-3 text-center transition-all cursor-pointer border-2 ${
                  isToday
                    ? "bg-yellow-500/20 border-yellow-400 scale-105 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    : isCompleted
                      ? "bg-green-500/20 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                      : "bg-slate-800/50 border-slate-700 opacity-70"
                }`}
                onClick={() => handleStartChallenge(challenge)}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-green-400" />
                <p className="text-xs text-white font-bold mb-1">{challenge.day}</p>
                <Badge className={`${DIFFICULTY_COLORS[challenge.difficulty]} border-2 text-[10px] px-1`}>
                  {challenge.difficulty[0].toUpperCase()}
                </Badge>
                {isCompleted && <div className="w-6 h-6 mx-auto mt-1 rounded-full bg-green-500" />}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
