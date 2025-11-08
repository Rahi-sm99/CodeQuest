"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  onClick?: () => void
  label?: string
  variant?: "default" | "outline" | "ghost"
  className?: string
}

export function BackButton({ 
  onClick, 
  label = "Back", 
  variant = "outline",
  className 
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
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
        ${className || ""}
      `}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}

