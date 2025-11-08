"use client"

import { cn } from "@/lib/utils"

interface LanguageBadgeProps {
  language: string
  className?: string
  onClick?: () => void
  isSelected?: boolean
}

const languageConfig: Record<
  string,
  {
    color: string
    icon: string
    gradient: string
    glow: string
  }
> = {
  python: {
    color: "text-blue-600",
    icon: "🐍",
    gradient: "bg-gradient-water",
    glow: "hover:glow-water",
  },
  javascript: {
    color: "text-yellow-500",
    icon: "⚡",
    gradient: "bg-gradient-electric",
    glow: "hover:glow-electric",
  },
  typescript: {
    color: "text-blue-500",
    icon: "📘",
    gradient: "bg-gradient-water",
    glow: "hover:glow-water",
  },
  java: {
    color: "text-red-600",
    icon: "☕",
    gradient: "bg-gradient-fire",
    glow: "hover:glow-fire",
  },
  cpp: {
    color: "text-blue-700",
    icon: "⚙️",
    gradient: "bg-gradient-psychic",
    glow: "hover:glow-psychic",
  },
  csharp: {
    color: "text-purple-600",
    icon: "#️⃣",
    gradient: "bg-gradient-psychic",
    glow: "hover:glow-psychic",
  },
  go: {
    color: "text-cyan-600",
    icon: "🔷",
    gradient: "bg-gradient-water",
    glow: "hover:glow-water",
  },
  rust: {
    color: "text-orange-600",
    icon: "🦀",
    gradient: "bg-gradient-fire",
    glow: "hover:glow-fire",
  },
}

export function LanguageBadge({ language, className, onClick, isSelected = false }: LanguageBadgeProps) {
  const config = languageConfig[language.toLowerCase()] || {
    color: "text-gray-600",
    icon: "💻",
    gradient: "bg-gray-200",
    glow: "hover:glow-primary",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold",
        "border-2 transition-all duration-300",
        "hover:scale-110 hover:-translate-y-1 active:scale-95",
        onClick && "cursor-pointer",
        !onClick && "cursor-default",
        isSelected
          ? cn(config.gradient, "text-white border-white shadow-lg animate-pulse-glow")
          : "bg-white text-gray-900 border-border hover:border-primary",
        !isSelected && config.glow,
        className,
      )}
    >
      <span className="text-lg leading-none">{config.icon}</span>
      <span className="uppercase tracking-wide">{language}</span>
      {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-sparkle" />}
    </button>
  )
}
