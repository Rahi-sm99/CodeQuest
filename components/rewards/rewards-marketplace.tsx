"use client"

import { useState } from "react"
import { REWARDS, type Reward } from "@/lib/rewards-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RewardsMarketplaceProps {
  userXP: number
  onRedeem: (reward: Reward) => void
}

export function RewardsMarketplace({ userXP, onRedeem }: RewardsMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredRewards = selectedCategory === "all" ? REWARDS : REWARDS.filter((r) => r.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-gaming text-white mb-2 glow-text">REWARDS MARKETPLACE</h2>
        <p className="text-slate-400 text-xs">Exchange your XP for awesome rewards</p>
        <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-green-500/20 border-2 border-yellow-500/50">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-lg font-bold text-yellow-400">{userXP.toLocaleString()} XP</span>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="gift-card">Gift Cards</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="merch">Merch</TabsTrigger>
          <TabsTrigger value="badge">Badges</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = userXP >= reward.xpCost
          return (
            <Card
              key={reward.id}
              className={`p-6 border-2 transition-all hover:scale-105 ${
                canAfford
                  ? "bg-slate-800/80 border-green-500/50 hover:border-green-400"
                  : "bg-slate-900/50 border-slate-700 opacity-60"
              }`}
            >
              <div
                className={`w-full h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative border-2 ${
                  reward.provider === "Amazon"
                    ? "border-orange-400/30 bg-gradient-to-br from-orange-400/10 to-yellow-500/10"
                    : reward.provider === "Flipkart"
                      ? "border-blue-400/30 bg-gradient-to-br from-blue-400/10 to-cyan-500/10"
                      : reward.provider === "Steam"
                        ? "border-slate-600/30 bg-gradient-to-br from-slate-600/10 to-slate-800/10"
                        : "border-slate-600/30"
                }`}
              >
                {reward.provider === "Amazon" && (
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-orange-400 to-yellow-500">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 mb-1">AMAZON</div>
                      <div className="text-sm text-slate-800">Gift Card</div>
                    </div>
                  </div>
                )}
                {reward.provider === "Flipkart" && (
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 to-cyan-500">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">FLIPKART</div>
                      <div className="text-sm text-blue-100">Gift Voucher</div>
                    </div>
                  </div>
                )}
                {reward.provider === "Steam" && (
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-600 to-slate-800">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-200 mb-1">STEAM</div>
                      <div className="text-sm text-slate-400">Wallet Code</div>
                    </div>
                  </div>
                )}
                {reward.provider === "CodeQuest" && (
                  <div
                    className={`relative z-10 w-full h-full flex items-center justify-center p-4 bg-gradient-to-br ${reward.gradient}`}
                  >
                    <div className="text-center text-white font-gaming text-2xl">{reward.icon}</div>
                  </div>
                )}
              </div>

              <h3 className="text-base font-gaming text-white mb-2 glow-text">{reward.name}</h3>
              <p className="text-slate-400 text-xs mb-4">{reward.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-yellow-400 font-bold">{reward.xpCost.toLocaleString()} XP</span>
                </div>
                {canAfford ? (
                  <span className="text-xs text-green-400 font-medium">Available</span>
                ) : (
                  <span className="text-xs text-red-400 font-medium">
                    Need {(reward.xpCost - userXP).toLocaleString()} more XP
                  </span>
                )}
              </div>

              <Button
                onClick={() => onRedeem(reward)}
                disabled={!canAfford || !reward.available}
                className={`w-full ${
                  canAfford
                    ? "bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-black font-bold"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {canAfford ? "Redeem Now" : "Insufficient XP"}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
