"use client"

import { Card } from "@/components/ui/card"

interface TutorialTooltipProps {
  title: string
  description: string
  icon: string
}

export function TutorialTooltip({ title, description, icon }: TutorialTooltipProps) {
  return (
    <Card className="absolute z-50 p-4 bg-card border-primary pixel-border glow-primary max-w-xs animate-fade-in-scale">
      <div className="flex items-start gap-3">
        <span className="text-3xl animate-sparkle">{icon}</span>
        <div>
          <h4 className="text-sm font-gaming text-primary glow-text mb-1">{title}</h4>
          <p className="text-xs text-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {/* Pointer arrow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-b-2 border-r-2 border-primary transform rotate-45" />
    </Card>
  )
}
