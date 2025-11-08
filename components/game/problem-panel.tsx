"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProblemPanelProps {
  title: string
  description: string
  difficulty: string
  concept: string
  hints: string[]
  examples: Array<{ input: string; output: string; explanation: string }>
}

const DIFFICULTY_COLORS = {
  easy: "bg-primary/20 text-primary border-primary",
  medium: "bg-accent/20 text-accent border-accent",
  hard: "bg-destructive/20 text-destructive border-destructive",
}

export function ProblemPanel({ title, description, difficulty, concept, hints, examples }: ProblemPanelProps) {
  return (
    <Card className="h-full bg-card border-primary/30 flex flex-col overflow-hidden pixel-border glow-primary">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 font-pixel">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-gaming text-primary glow-text">{title}</h3>
              <Badge
                className={`${DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS]} border pixel-border font-pixel text-xs`}
              >
                {difficulty.toUpperCase()}
              </Badge>
            </div>
            <Badge variant="outline" className="border-accent text-accent font-pixel text-xs pixel-border">
              📦 {concept}
            </Badge>
          </div>

          {/* Problem Description */}
          <div>
            <h4 className="font-gaming text-primary text-sm glow-text mb-2">▶ PROBLEM STATEMENT</h4>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm font-pixel">{description}</p>
          </div>

          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-input border-primary/30 pixel-border">
              <TabsTrigger
                value="examples"
                className="font-pixel text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                📋 EXAMPLES
              </TabsTrigger>
              <TabsTrigger
                value="hints"
                className="font-pixel text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                💡 HINTS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="examples" className="space-y-3 mt-4">
              {examples.map((example, idx) => (
                <div key={idx} className="space-y-2 p-3 bg-card border-l-4 border-primary">
                  <p className="text-xs font-gaming text-primary glow-text">Example {idx + 1}:</p>
                  <div className="text-xs space-y-1 font-pixel">
                    <p className="text-foreground">
                      <span className="text-accent">▶ INPUT:</span>{" "}
                      <span className="text-primary">{example.input}</span>
                    </p>
                    <p className="text-foreground">
                      <span className="text-accent">▶ OUTPUT:</span>{" "}
                      <span className="text-primary">{example.output}</span>
                    </p>
                    <p className="text-muted text-xs italic">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="hints" className="space-y-3 mt-4">
              {hints.length > 0 ? (
                hints.map((hint, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-accent/10 border-l-4 border-accent">
                    <span className="text-accent flex-shrink-0 mt-0.5 text-lg">💡</span>
                    <p className="text-xs text-foreground font-pixel">{hint}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted text-xs font-pixel">No hints available for this problem.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </Card>
  )
}
