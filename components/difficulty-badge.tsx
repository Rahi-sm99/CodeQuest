import { cn } from "@/lib/utils"

interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard"
  className?: string
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const styles = {
    easy: {
      bg: "bg-gradient-grass",
      text: "text-white",
      glow: "hover:glow-grass",
      border: "border-secondary",
    },
    medium: {
      bg: "bg-gradient-electric",
      text: "text-gray-900",
      glow: "hover:glow-electric",
      border: "border-primary",
    },
    hard: {
      bg: "bg-gradient-fire",
      text: "text-white",
      glow: "hover:glow-fire",
      border: "border-accent",
    },
  }

  const style = styles[difficulty]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide",
        "border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5",
        "cursor-default select-none",
        style.bg,
        style.text,
        style.glow,
        style.border,
        className,
      )}
    >
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      {difficulty}
    </span>
  )
}
