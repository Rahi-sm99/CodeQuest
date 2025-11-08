"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GLOBAL_LEADERBOARD, getCurrentUserRank } from "@/lib/mock-community-data"
import { useState } from "react"

interface LeaderboardProps {
  userXP: number
  completedLevels: number[]
}

export function Community({ userXP, completedLevels }: LeaderboardProps) {
  const progressPercent = (completedLevels.length / 100) * 100
  const userRank = getCurrentUserRank(userXP)
  const [selectedRegion, setSelectedRegion] = useState<string>("kanto")
  const [communityPost, setCommunityPost] = useState("")
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: "1",
      username: "Alice Dev",
      avatar: "A",
      content: "Just finished my first sorting algorithm implementation. Bubble sort is easier than I thought.",
      likes: 12,
      replies: 3,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      username: "Bob Coder",
      avatar: "B",
      content: "Check out my calculator app built with React. Would love feedback from the community.",
      likes: 24,
      replies: 7,
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      username: "Charlie Tech",
      avatar: "C",
      content: "Anyone else struggling with binary trees? Looking for study partners.",
      likes: 8,
      replies: 15,
      timestamp: "1 day ago",
    },
  ])

  const handlePostSubmit = () => {
    if (communityPost.trim()) {
      setCommunityPosts([
        {
          id: Date.now().toString(),
          username: "Code Trainer",
          avatar: "U",
          content: communityPost,
          likes: 0,
          replies: 0,
          timestamp: "Just now",
        },
        ...communityPosts,
      ])
      setCommunityPost("")
    }
  }

  return (
    <div className="space-y-6 font-pixel">
      <div>
        <h2 className="text-3xl font-gaming text-white mb-2">COMMUNITY</h2>
        <p className="text-muted text-sm">Connect with trainers worldwide</p>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-input border-primary/30 pixel-border font-pixel text-xs">
          <TabsTrigger
            value="stats"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            STATS
          </TabsTrigger>
          <TabsTrigger
            value="global"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            GLOBAL
          </TabsTrigger>
          <TabsTrigger
            value="feed"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            FEED
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <Card className="p-6 bg-card/20 border-primary pixel-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-primary pixel-border flex items-center justify-center text-3xl font-gaming text-white animate-pikachu-bounce">
                  U
                </div>
                <div>
                  <h3 className="text-xl font-gaming text-white">Code Trainer</h3>
                  <p className="text-sm text-muted">Global Rank #{userRank}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-gaming text-secondary">{userXP}</p>
                  <p className="text-xs text-muted">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-gaming text-accent">{completedLevels.length}</p>
                  <p className="text-xs text-muted">Levels</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card/20 border-primary pixel-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">⚡</span>
                <p className="text-muted text-sm font-pixel">TOTAL XP</p>
              </div>
              <p className="text-4xl font-gaming text-primary">{userXP}</p>
            </Card>

            <Card className="p-6 bg-card/20 border-accent pixel-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🏆</span>
                <p className="text-muted text-sm font-pixel">LEVELS DONE</p>
              </div>
              <p className="text-4xl font-gaming text-accent">{completedLevels.length}/100</p>
            </Card>
          </div>

          <Card className="p-6 bg-card/20 border-primary/30 pixel-border">
            <h3 className="font-gaming text-white mb-4 text-sm">PROGRESS TO MASTERY</h3>
            <Progress value={progressPercent} className="h-4 mb-2" />
            <p className="text-xs text-muted font-pixel">{progressPercent.toFixed(0)}% COMPLETE</p>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-3">
          <Card className="p-4 bg-card/20 border-secondary pixel-border">
            <p className="text-sm font-gaming text-center text-white">TOP 10 TRAINERS WORLDWIDE</p>
          </Card>

          {GLOBAL_LEADERBOARD.map((user, index) => (
            <Card
              key={user.id}
              className={`p-4 pixel-border hover-lift transition-all ${
                index < 3 ? "bg-card/20 border-secondary" : "bg-card/20 border-primary/30 hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl animate-pikachu-bounce">{user.avatar}</span>
                    <Badge
                      className={`text-xs pixel-border font-pixel mt-1 ${
                        index === 0
                          ? "bg-secondary/30 text-secondary border-secondary"
                          : index === 1
                            ? "bg-muted/30 text-muted border-muted"
                            : index === 2
                              ? "bg-fire/30 text-fire border-fire"
                              : "bg-primary/30 text-primary border-primary"
                      }`}
                    >
                      #{user.rank}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-gaming text-white text-sm">{user.username}</h4>
                    <div className="flex gap-4 mt-1">
                      <p className="text-xs text-muted">{user.levels} levels</p>
                      <p className="text-xs text-muted">{user.badges} badges</p>
                      <p className="text-xs text-accent">{user.streak} day streak</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-gaming text-white text-lg">{user.xp}</p>
                  <p className="text-xs text-muted font-pixel">XP</p>
                </div>
              </div>
            </Card>
          ))}

          {userRank > 10 && (
            <Card className="p-4 bg-card/20 border-primary pixel-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary/30 text-primary border-primary pixel-border font-pixel text-xs">
                    #{userRank}
                  </Badge>
                  <div>
                    <h4 className="font-gaming text-white text-sm">You (Code Trainer)</h4>
                    <p className="text-xs text-muted">{completedLevels.length} levels completed</p>
                  </div>
                </div>
                <p className="font-gaming text-white text-lg">{userXP}</p>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="feed" className="space-y-4">
          <Card className="p-4 bg-card/20 border-psychic pixel-border">
            <p className="text-sm font-gaming text-center text-white">COMMUNITY FEED</p>
          </Card>

          <Card className="p-4 bg-card/20 border-primary/30 pixel-border">
            <h4 className="font-gaming text-white text-sm mb-3">SHARE YOUR PROGRESS</h4>
            <div className="space-y-3">
              <Input
                placeholder="Share your projects, ask questions, or connect with others..."
                value={communityPost}
                onChange={(e) => setCommunityPost(e.target.value)}
                className="bg-input border-primary/50 text-foreground placeholder:text-muted pixel-border font-pixel text-xs"
              />
              <Button
                onClick={handlePostSubmit}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 font-pixel text-xs"
              >
                POST
              </Button>
            </div>
          </Card>

          <div className="space-y-3">
            {communityPosts.map((post) => (
              <Card
                key={post.id}
                className="p-4 bg-card/20 border-primary/30 pixel-border hover-lift hover:border-accent transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-primary flex items-center justify-center text-white font-gaming">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-gaming text-white text-sm">{post.username}</h4>
                      <span className="text-xs text-muted">{post.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground mb-3">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent/80 font-pixel">
                        {post.likes} Likes
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-muted hover:text-muted/80 font-pixel">
                        {post.replies} Replies
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary hover:text-primary/80 font-pixel"
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { Community as Leaderboard }
