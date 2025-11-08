"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DailyChallenge } from "@/components/features/daily-challenge"
import { WeeklyTasks } from "@/components/features/weekly-tasks"
import { Github } from "lucide-react"

interface DashboardProps {
  selectedLevel: number
  completedLevels: number[]
  userXP: number
  selectedLanguage: string
  onLanguageChange: (lang: string) => void
  onPlayClick: () => void
  onBrowseLevels: () => void
  onStartChallenge: (problemId: number) => void
  onOpenProfile?: () => void
}

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

export function Dashboard({
  selectedLevel,
  completedLevels,
  userXP,
  selectedLanguage,
  onLanguageChange,
  onPlayClick,
  onBrowseLevels,
  onStartChallenge,
  onOpenProfile,
}: DashboardProps) {
  const progressPercent = (completedLevels.length / 100) * 100

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="clean-card p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground mb-6">Continue your DSA mastery journey</p>
            <div className="flex gap-3">
              <Button
                onClick={onPlayClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-heading font-bold"
              >
                Continue Learning
              </Button>
              <Button
                onClick={onBrowseLevels}
                variant="outline"
                className="px-6 py-3 rounded-xl font-heading font-semibold border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                Browse All Levels
              </Button>
            </div>
          </div>
          <div className="hidden md:flex items-start justify-end min-w-0">
            {/* GitHub connect CTA — kept inside the card to avoid overflow */}
            <div className="w-full max-w-[320px] flex flex-col items-end gap-2">
              <Button
                onClick={() => onOpenProfile && onOpenProfile()}
                className="w-full flex items-center justify-center gap-2 bg-slate-800/30 border-2 border-yellow-500/30 text-white px-4 py-2 rounded-md max-w-full whitespace-nowrap"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-sm font-heading font-bold">CONNECT TO GITHUB</span>
              </Button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground self-start mt-1 flex-wrap">
                <div className="flex items-center gap-1 mr-2">
                  <Github className="w-4 h-4 text-white/80" />
                  <span>GitHub</span>
                </div>
                <div className="flex items-center gap-1 mr-2">
                  {/* Judge0 placeholder icon */}
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-[10px] font-bold">J0</div>
                  <span>Judge0</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* Auth0 placeholder icon */}
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-[10px] font-bold">A0</div>
                  <span>Auth0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="clean-card p-6 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Current Level</p>
              <p className="text-4xl font-heading font-bold text-foreground">{selectedLevel}</p>
            </div>
            <div className="stat-icon">
              {/* Unique icon for Current Level */}
              <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 6 6 .5-4.5 3.9L19 20l-7-4-7 4 1.5-7.6L3 8.5 9 8z"/></svg>
            </div>
          </div>
        </Card>

        <Card className="clean-card p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Total XP</p>
              <p className="text-4xl font-heading font-bold text-primary">{userXP}</p>
            </div>
            <div className="stat-icon border-2 border-primary flex items-center justify-center p-1 rounded-md">
              {/* Unique icon for Total XP */}
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20"/></svg>
            </div>
          </div>
        </Card>

        <Card className="clean-card p-6 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Completed</p>
              <p className="text-4xl font-heading font-bold text-secondary">
                {completedLevels.length}
                <span className="text-xl text-muted-foreground">/100</span>
              </p>
            </div>
            <div className="stat-icon border-2 border-secondary flex items-center justify-center p-1 rounded-md">
              {/* Unique icon for Completed */}
              <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress bar */}
      <Card className="clean-card p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground">DSA Mastery Progress</h3>
            <span className="text-sm font-mono font-bold text-primary">{progressPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Language selector */}
      <Card className="clean-card p-6">
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-foreground">Select Language</h3>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full h-12 text-base font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-base">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Daily challenges and weekly tasks */}
      <DailyChallenge completedLevels={completedLevels} onStartChallenge={onStartChallenge} />
      <WeeklyTasks completedLevels={completedLevels} userXP={userXP} />
      {/* Competitions are now on a separate screen (see Competitions page) */}
    </div>
  )
}
