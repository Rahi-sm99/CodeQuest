"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewBackButtonProps {
  onBack: () => void
  label?: string
  className?: string
  toView?: string
}

export function ViewBackButton({ 
  onBack, 
  label,
  className,
  toView
}: ViewBackButtonProps) {
  const displayLabel = label || (toView ? `Back to ${toView}` : "Back")

  return (
    <Button
      onClick={onBack}
      variant="outline"
      className={`
        inline-flex items-center gap-2
        text-slate-300 hover:text-yellow-400 
        hover:bg-slate-800/50 
        border-2 border-yellow-500/30 
        bg-slate-800/40
        font-gaming
        transition-all
        hover:scale-105
        hover:border-yellow-500/60
        mb-4
        ${className || ""}
      `}
    >
      <ArrowLeft className="w-4 h-4" />
      {displayLabel}
    </Button>
  )
}

