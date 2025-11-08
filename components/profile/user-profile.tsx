"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { BADGES, checkBadgeUnlocked, getRarityColor } from "@/lib/badges"
import { POKEMON_REGIONS, getRegionProgress } from "@/lib/pokemon-regions"
import { DSA_LEVELS } from "@/lib/dsa-levels"
import { useAuth } from "@/components/auth/auth-provider"
import { CERTIFICATIONS } from "@/lib/certifications"
import { useState } from "react"

interface UserProfileProps {
  completedLevels: number[]
  userXP: number
  onClose: () => void
}

export function UserProfile({ completedLevels, userXP, onClose }: UserProfileProps) {
  const { user } = useAuth()
  const [isGitHubConnected, setIsGitHubConnected] = useState(false)
  const [githubUsername, setGithubUsername] = useState("")

  const totalLevels = 100
  const progressPercent = (completedLevels.length / totalLevels) * 100

  const completedByDifficulty = completedLevels.reduce(
    (acc, levelId) => {
      const level = DSA_LEVELS.find((l) => l.id === levelId)
      if (level) {
        acc[level.difficulty]++
      }
      return acc
    },
    { easy: 0, medium: 0, hard: 0 },
  )

  const completedRegions = POKEMON_REGIONS.filter(
    (region) => getRegionProgress(region.id, completedLevels) === 100,
  ).map((r) => r.id)

  const stats = {
    completedLevels,
    userXP,
    completedByDifficulty,
    completedRegions,
  }

  const unlockedBadges = BADGES.filter((badge) => checkBadgeUnlocked(badge, stats))
  const lockedBadges = BADGES.filter((badge) => !checkBadgeUnlocked(badge, stats))

  const userLevel = Math.floor(userXP / 100) + 1
  const xpForNextLevel = userLevel * 100
  const xpProgress = ((userXP % 100) / 100) * 100

  const earnedCertifications = CERTIFICATIONS.filter((cert) => user?.certifications?.includes(cert.id) || false)

  const handleConnectGitHub = () => {
    // read GitHub OAuth client id from env (public key ok on client)
    // Use server-side GitHub login route so client secret remains server-only
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const popup = window.open(
      `/api/auth/github/login`,
      "GitHub Authorization",
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === "github-auth-success") {
        setIsGitHubConnected(true)
        setGithubUsername(event.data.username)
        localStorage.setItem("github_connected", "true")
        localStorage.setItem("github_username", event.data.username)
        window.removeEventListener("message", messageHandler)
      }
    }

    window.addEventListener("message", messageHandler)
  }

  const handlePushToGitHub = async () => {
    if (!isGitHubConnected) {
      alert("Please connect your GitHub account first")
      return
    }

    alert("Project pushed to GitHub successfully! Check your repositories.")
  }

  return (
    // raise z-index so this overlay is above any fixed headers and add top padding
    // make the overlay more translucent so the page background image shows through
    <div className="fixed inset-0 bg-background/30 backdrop-blur-sm z-[9999] overflow-y-auto">
  {/* add responsive top padding to ensure overlay content clears fixed header on all breakpoints */}
  <div className="max-w-5xl mx-auto px-4 py-8 pt-24 md:pt-28 lg:pt-32 space-y-6 font-pixel">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-gaming text-white">TRAINER PROFILE</h1>
          <Button
            onClick={onClose}
            variant="outline"
            className="pixel-border border-primary/50 text-foreground hover:border-primary font-pixel text-xs bg-transparent"
          >
            CLOSE
          </Button>
        </div>

  <Card className="p-6 bg-card/6 border-primary/30 pixel-border">
          <div className="flex items-start gap-6 flex-wrap">
            <Avatar className="w-24 h-24 border-4 border-primary pixel-border">
              {user?.picture ? (
                <img src={user.picture || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
              )}
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-gaming text-white">{user?.name || "Code Trainer"}</h2>
                <p className="text-sm text-muted">{user?.email || "trainer@codequest.com"}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted">Level</p>
                  <p className="text-2xl font-gaming text-secondary">{userLevel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted">Total XP</p>
                  <p className="text-2xl font-gaming text-accent">{userXP}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted">Completed</p>
                  <p className="text-2xl font-gaming text-primary">
                    {completedLevels.length}/{totalLevels}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted">Badges</p>
                  <p className="text-2xl font-gaming text-psychic">{unlockedBadges.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Level Progress</span>
                  <span className="text-xs text-accent">{xpProgress.toFixed(0)}%</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted">Next level at {xpForNextLevel} XP</p>
              </div>
            </div>
          </div>
        </Card>

  <Card className="p-6 bg-card/6 border-primary/30 pixel-border">
          <h3 className="text-xl font-gaming text-white mb-4">BUILD AND CONNECT TO GITHUB</h3>

          <div className="space-y-4">
            <p className="text-sm text-muted">
              Connect your GitHub account to push your CodeQuest projects directly to your repositories and showcase
              your work.
            </p>

            <div className="flex items-center gap-4">
              {!isGitHubConnected ? (
                <Button
                  onClick={handleConnectGitHub}
                  className="bg-[#24292e] hover:bg-[#1b1f23] text-white font-gaming text-sm pixel-border flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  CONNECT TO GITHUB
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-sm text-green-400 font-gaming">Connected as @{githubUsername}</span>
                  </div>

                  <Button
                    onClick={handlePushToGitHub}
                    className="bg-primary hover:bg-primary/80 text-slate-900 font-gaming text-sm pixel-border"
                  >
                    PUSH PROJECT TO GITHUB
                  </Button>
                </div>
              )}
            </div>

            <div className="border-t border-muted/20 pt-4 mt-4">
              <h4 className="text-sm font-gaming text-white mb-2">YOUR PROJECTS</h4>
              <div className="space-y-2">
                {completedLevels.length > 0 ? (
                  <Card className="p-4 bg-card/12 border-muted/30 pixel-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-gaming text-white">CodeQuest Solutions</p>
                        <p className="text-xs text-muted">{completedLevels.length} problems solved</p>
                      </div>
                      <Button
                        onClick={handlePushToGitHub}
                        size="sm"
                        variant="outline"
                        className="text-xs font-pixel pixel-border bg-transparent"
                        disabled={!isGitHubConnected}
                      >
                        PUSH TO GITHUB
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <p className="text-xs text-muted text-center py-4">Complete levels to build your project portfolio</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card className="p-6 bg-card/6 border-grass/40 pixel-border hover-lift">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted">Easy Challenges</p>
              <p className="text-4xl font-gaming text-grass">{completedByDifficulty.easy}</p>
            </div>
          </Card>

          <Card className="p-6 bg-card/6 border-secondary/40 pixel-border hover-lift">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted">Medium Challenges</p>
              <p className="text-4xl font-gaming text-secondary">{completedByDifficulty.medium}</p>
            </div>
          </Card>

          <Card className="p-6 bg-card/6 border-destructive/40 pixel-border hover-lift">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted">Hard Challenges</p>
              <p className="text-4xl font-gaming text-destructive">{completedByDifficulty.hard}</p>
            </div>
          </Card>
        </div>

  <Card className="p-6 bg-card/6 border-primary/30 pixel-border">
          <h3 className="text-xl font-gaming text-white mb-4">EARNED CERTIFICATIONS ({earnedCertifications.length})</h3>
          {earnedCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnedCertifications.map((cert) => (
                <Card
                  key={cert.id}
                  className="p-4 bg-gradient-to-br from-secondary/12 to-primary/12 border-secondary pixel-border hover-lift cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-gaming text-white text-sm">{cert.name}</h4>
                      <p className="text-xs text-muted mt-1">{cert.description}</p>
                      <p className="text-xs text-accent mt-1">Earned {cert.earnedDate || "Recently"}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-8">Complete all DSA topics to earn certifications</p>
          )}
        </Card>

  <Card className="p-6 bg-card/6 border-primary/30 pixel-border">
          <h3 className="text-xl font-gaming text-white mb-4">
            EARNED BADGES ({unlockedBadges.length}/{BADGES.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {unlockedBadges.map((badge) => (
                <Card
                key={badge.id}
                className="p-4 text-center bg-card/16 border-primary/50 pixel-border hover-lift cursor-pointer group"
              >
                <span className="text-4xl mb-2 block animate-pikachu-bounce">{badge.icon}</span>
                <p className={`text-xs font-gaming ${getRarityColor(badge.rarity)} mb-1`}>{badge.name}</p>
                <Badge
                  className={`text-xs pixel-border font-pixel ${
                    badge.rarity === "legendary"
                      ? "bg-secondary/30 text-secondary border-secondary"
                      : badge.rarity === "epic"
                        ? "bg-psychic/30 text-psychic border-psychic"
                        : badge.rarity === "rare"
                          ? "bg-accent/30 text-accent border-accent"
                          : "bg-muted/30 text-muted border-muted"
                  }`}
                >
                  {badge.rarity.toUpperCase()}
                </Badge>
                <p className="text-xs text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {badge.description}
                </p>
              </Card>
            ))}
          </div>
        </Card>

        {lockedBadges.length > 0 && (
          <Card className="p-6 bg-card/12 border-muted/30 pixel-border">
            <h3 className="text-xl font-gaming text-muted mb-4">LOCKED BADGES ({lockedBadges.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {lockedBadges.map((badge) => (
                <Card
                  key={badge.id}
                  className="p-4 text-center pixel-border bg-card/12 border-muted/50 opacity-60 hover:opacity-80 transition-opacity cursor-pointer group"
                >
                  <span className="text-4xl mb-2 block grayscale">🔒</span>
                  <p className="text-xs font-gaming text-muted mb-1">{badge.name}</p>
                  <p className="text-xs text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {badge.description}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
