"use client"

import { useState, useRef } from "react"
import { Dashboard } from "@/components/dashboard/dashboard"
import { GameInterface } from "@/components/game/game-interface"
import { LevelsBrowser } from "@/components/levels/levels-browser"
import { Leaderboard } from "@/components/leaderboard/leaderboard"
import { UserProfile } from "@/components/profile/user-profile"
import { AchievementsPanel } from "@/components/features/achievements-panel"
import { RewardsMarketplace } from "@/components/rewards/rewards-marketplace"
import { LearnCenter } from "@/components/learn/learn-center"
import { LoginForm } from "@/components/auth/login-form"
import { OnboardingModal } from "@/components/auth/onboarding-modal"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { calculateLevel, calculateRank, getRankColor } from "@/lib/user-data"
import type { Reward } from "@/lib/rewards-data"
import { PageTransitionWrapper } from "@/components/transitions/page-transition-wrapper"
import { ViewBackButton } from "@/components/navigation/view-back-button"
import { CompetitionsPage } from "@/components/competitions/competitions-page"
type View = "dashboard" | "game" | "levels" | "leaderboard" | "profile" | "achievements" | "learn" | "rewards" | "competitions"

export default function Home() {
  const { user, isLoading, isFirstLogin, logout, updateUserProgress, updateLanguage } = useAuth()
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [viewHistory, setViewHistory] = useState<View[]>(["dashboard"])
  const previousViewRef = useRef<View>("dashboard")

  const completedLevels = user?.completedLevels || []
  const userXP = user?.xp || 0
  const selectedLanguage = user?.selectedLanguage || "python"

  const userLevel = calculateLevel(userXP)
  const userRank = calculateRank(userLevel)

  const handleLevelComplete = (xpEarned: number) => {
    const newCompletedLevels = [...completedLevels, selectedLevel]
    const newXP = userXP + xpEarned
    updateUserProgress(newXP, newCompletedLevels)
    setSelectedLevel(selectedLevel + 1)
    navigateToView("dashboard")
  }

  // Navigate to a view and track history
  const navigateToView = (view: View) => {
    if (view !== currentView) {
      setViewHistory((prev) => {
        // Don't add duplicate consecutive views
        if (prev[prev.length - 1] !== view) {
          return [...prev, view]
        }
        return prev
      })
      previousViewRef.current = currentView
      setCurrentView(view)
    }
  }

  // Navigate back to previous view
  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory]
      newHistory.pop() // Remove current view
      const previousView = newHistory[newHistory.length - 1]
      setViewHistory(newHistory)
      setCurrentView(previousView)
    } else {
      // Fallback to dashboard if no history
      setCurrentView("dashboard")
    }
  }

  // Get the previous view name for display
  const getPreviousViewName = (): string => {
    if (viewHistory.length > 1) {
      const prevView = viewHistory[viewHistory.length - 2]
      const viewNames: Record<View, string> = {
        dashboard: "Home",
        game: "Game",
        levels: "Levels",
        learn: "Learn",
        achievements: "Achievements",
        rewards: "Rewards",
        leaderboard: "Community",
        profile: "Profile",
        competitions: "Competitions",
      }
      return viewNames[prevView] || "Home"
    }
    return "Home"
  }

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level)
    navigateToView("game")
  }

  const handleRedeemReward = (reward: Reward) => {
    if (userXP >= reward.xpCost) {
      updateUserProgress(userXP - reward.xpCost, completedLevels)
      alert(`Successfully redeemed: ${reward.name}!`)
    }
  }

  const handleLanguageChange = (language: string) => {
    updateLanguage(language)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary font-gaming text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (isFirstLogin) {
    return <OnboardingModal />
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Pixel art background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gXtBfc5yt2OLqLK8XrquQ07hDTWwgm.png)",
          backgroundRepeat: "repeat-y",
        }}
      />

      {/* Gaming background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-green-500/5 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.05),transparent_50%)] pointer-events-none" />

      <header className="border-b-2 border-yellow-500/30 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-removebg-preview-mvAWoo4bATwFYhWIkwh6imVHmFE3QQ.png"
                alt="CodeQuest Logo"
                className="w-20 h-20 hover:scale-110 transition-transform"
              />
              <h1 className="text-2xl font-gaming text-white">CodeQuest</h1>
            </div>

            <div className="flex items-center gap-3">
              {user?.picture && (
                <img
                  src={user.picture || "/placeholder.svg"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-yellow-500/50 hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => navigateToView("profile")}
                />
              )}

              <div
                className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${getRankColor(userRank)} hover:scale-105 transition-transform cursor-pointer border-2 border-yellow-500/50`}
                onClick={() => navigateToView("profile")}
              >
                <span className="text-slate-900 font-gaming text-xs">{userRank}</span>
                <span className="text-slate-900 font-gaming text-xs ml-2">LV.{userLevel}</span>
              </div>

              <Button
                onClick={logout}
                size="sm"
                variant="ghost"
                className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 font-gaming"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b-2 border-yellow-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-2 overflow-x-auto">
            {[
              { id: "dashboard", label: "Home" },
              { id: "competitions", label: "Competitions" },
              { id: "levels", label: "Levels" },
              { id: "learn", label: "Learn" },
              { id: "achievements", label: "Achievements" },
              { id: "rewards", label: "Rewards" },
              { id: "leaderboard", label: "Community" },
              { id: "profile", label: "Profile" },
            ].map(({ id, label }) => (
              <Button
                key={id}
                variant={currentView === id ? "default" : "ghost"}
                onClick={() => navigateToView(id as View)}
                size="sm"
                className={
                  currentView === id
                    ? "bg-gradient-to-r from-yellow-500 to-green-500 text-slate-900 hover:from-yellow-600 hover:to-green-600 font-gaming border-2 border-yellow-400 text-xs"
                    : "text-slate-400 hover:text-yellow-400 hover:bg-slate-800/50 border-2 border-transparent hover:border-yellow-500/30 text-xs font-gaming"
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <PageTransitionWrapper transitionKey={currentView}>
          {/* Universal Back Button - shows on all views except dashboard */}
          {currentView !== "dashboard" && (
            <div className="mb-4">
              <ViewBackButton 
                onBack={navigateBack}
                toView={getPreviousViewName()}
              />
            </div>
          )}

          {currentView === "dashboard" && (
            <Dashboard
              selectedLevel={selectedLevel}
              completedLevels={completedLevels}
              userXP={userXP}
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              onPlayClick={() => navigateToView("game")}
              onBrowseLevels={() => navigateToView("levels")}
              onStartChallenge={handleSelectLevel}
              onOpenProfile={() => navigateToView("profile")}
            />
          )}

          {currentView === "competitions" && <CompetitionsPage />}

          {currentView === "game" && (
            <GameInterface
              level={selectedLevel}
              language={selectedLanguage}
              userXP={userXP}
              onLevelComplete={handleLevelComplete}
              onBack={navigateBack}
            />
          )}

          {currentView === "levels" && (
            <LevelsBrowser
              completedLevels={completedLevels}
              currentLevel={selectedLevel}
              onSelectLevel={handleSelectLevel}
            />
          )}

          {currentView === "learn" && <LearnCenter onBack={navigateBack} />}

          {currentView === "rewards" && (
            <RewardsMarketplace userXP={userXP} onRedeem={handleRedeemReward} />
          )}

          {currentView === "leaderboard" && <Leaderboard userXP={userXP} completedLevels={completedLevels} />}

          {currentView === "profile" && (
            <UserProfile
              completedLevels={completedLevels}
              userXP={userXP}
              onClose={navigateBack}
            />
          )}

          {currentView === "achievements" && (
            <div className="animate-slide-up">
              <AchievementsPanel completedLevels={completedLevels} userXP={userXP} />
            </div>
          )}
        </PageTransitionWrapper>
      </main>
    </div>
  )
}
