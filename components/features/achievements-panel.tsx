"use client"

import { Card } from "@/components/ui/card"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  total: number
}

interface AchievementsPanelProps {
  completedLevels: number[]
  userXP: number
}

export function AchievementsPanel({ completedLevels, userXP }: AchievementsPanelProps) {
  const achievements: Achievement[] = [
    {
      id: "first_step",
      name: "FIRST STEP",
      description: "Complete Level 1",
      icon: "👣",
      unlocked: completedLevels.length > 0,
      progress: completedLevels.length > 0 ? 1 : 0,
      total: 1,
    },
    {
      id: "early_bird",
      name: "EARLY BIRD",
      description: "Complete 5 Levels",
      icon: "🐣",
      unlocked: completedLevels.length >= 5,
      progress: Math.min(completedLevels.length, 5),
      total: 5,
    },
    {
      id: "rookie_coder",
      name: "ROOKIE CODER",
      description: "Complete 10 Levels",
      icon: "💻",
      unlocked: completedLevels.length >= 10,
      progress: Math.min(completedLevels.length, 10),
      total: 10,
    },
    {
      id: "quarter_master",
      name: "QUARTER MASTER",
      description: "Complete 25 Levels",
      icon: "⭐",
      unlocked: completedLevels.length >= 25,
      progress: Math.min(completedLevels.length, 25),
      total: 25,
    },
    {
      id: "halfway_hero",
      name: "HALFWAY HERO",
      description: "Complete 50 Levels",
      icon: "🦸",
      unlocked: completedLevels.length >= 50,
      progress: Math.min(completedLevels.length, 50),
      total: 50,
    },
    {
      id: "veteran_warrior",
      name: "VETERAN WARRIOR",
      description: "Complete 75 Levels",
      icon: "⚔️",
      unlocked: completedLevels.length >= 75,
      progress: Math.min(completedLevels.length, 75),
      total: 75,
    },
    {
      id: "master_coder",
      name: "MASTER CODER",
      description: "Complete All 100 Levels",
      icon: "👑",
      unlocked: completedLevels.length === 100,
      progress: completedLevels.length,
      total: 100,
    },
    {
      id: "xp_collector",
      name: "XP COLLECTOR",
      description: "Earn 1000+ XP",
      icon: "💰",
      unlocked: userXP >= 1000,
      progress: Math.min(userXP, 1000),
      total: 1000,
    },
    {
      id: "xp_millionaire",
      name: "XP MILLIONAIRE",
      description: "Earn 5000+ XP",
      icon: "💎",
      unlocked: userXP >= 5000,
      progress: Math.min(userXP, 5000),
      total: 5000,
    },
    {
      id: "xp_legend",
      name: "XP LEGEND",
      description: "Earn 10000+ XP",
      icon: "🏆",
      unlocked: userXP >= 10000,
      progress: Math.min(userXP, 10000),
      total: 10000,
    },
    {
      id: "speedrunner",
      name: "SPEEDRUNNER",
      description: "Complete 5 Levels in One Session",
      icon: "⚡",
      unlocked: false,
      progress: 0,
      total: 5,
    },
    {
      id: "persistent",
      name: "PERSISTENT",
      description: "Login 7 Days in a Row",
      icon: "🔥",
      unlocked: false,
      progress: 0,
      total: 7,
    },
    {
      id: "perfectionist",
      name: "PERFECTIONIST",
      description: "Get 100% on 10 Levels",
      icon: "🎯",
      unlocked: false,
      progress: 0,
      total: 10,
    },
    {
      id: "night_owl",
      name: "NIGHT OWL",
      description: "Complete a Level After Midnight",
      icon: "🦉",
      unlocked: false,
      progress: 0,
      total: 1,
    },
    {
      id: "community_helper",
      name: "COMMUNITY HELPER",
      description: "Help 5 Other Users",
      icon: "🤝",
      unlocked: false,
      progress: 0,
      total: 5,
    },
    {
      id: "array_master",
      name: "ARRAY MASTER",
      description: "Complete All Array Challenges",
      icon: "📊",
      unlocked: false,
      progress: 0,
      total: 15,
    },
    {
      id: "tree_climber",
      name: "TREE CLIMBER",
      description: "Master Tree Data Structures",
      icon: "🌳",
      unlocked: false,
      progress: 0,
      total: 12,
    },
    {
      id: "graph_explorer",
      name: "GRAPH EXPLORER",
      description: "Complete All Graph Problems",
      icon: "🗺️",
      unlocked: false,
      progress: 0,
      total: 10,
    },
    {
      id: "dp_genius",
      name: "DP GENIUS",
      description: "Master Dynamic Programming",
      icon: "🧠",
      unlocked: false,
      progress: 0,
      total: 8,
    },
    {
      id: "bug_hunter",
      name: "BUG HUNTER",
      description: "Debug 20 Code Solutions",
      icon: "🐛",
      unlocked: false,
      progress: 0,
      total: 20,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-gaming text-xl text-white glow-text">ACHIEVEMENTS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const progressPercent = (achievement.progress / achievement.total) * 100

          return (
            <Card
              key={achievement.id}
              className={`pixel-border p-4 text-center transition-all ${
                achievement.unlocked ? "glow-primary bg-primary/10" : "bg-card/50 opacity-70"
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-pixel text-sm text-white mb-1">{achievement.name}</h4>
              <p className="text-xs text-muted mb-3">{achievement.description}</p>

              <div className="space-y-2">
                <div className="bg-card/50 h-2 rounded-full overflow-hidden pixel-border">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-pixel">
                    {achievement.progress}/{achievement.total}
                  </span>
                  <span className="text-primary font-pixel">{Math.round(progressPercent)}%</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
