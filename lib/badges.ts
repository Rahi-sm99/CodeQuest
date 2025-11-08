// Pokemon-themed achievement badges
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  requirement: {
    type: "levels" | "xp" | "streak" | "region" | "difficulty" | "special"
    value: number | string
  }
  unlocked?: boolean
}

export const BADGES: Badge[] = [
  // Starter Badges
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first coding challenge",
    icon: "🐣",
    rarity: "common",
    requirement: { type: "levels", value: 1 },
  },
  {
    id: "beginner-trainer",
    name: "Beginner Trainer",
    description: "Complete 5 levels",
    icon: "🎒",
    rarity: "common",
    requirement: { type: "levels", value: 5 },
  },
  {
    id: "kanto-explorer",
    name: "Kanto Explorer",
    description: "Complete all levels in Kanto Region",
    icon: "🔴",
    rarity: "rare",
    requirement: { type: "region", value: "kanto" },
  },
  {
    id: "johto-master",
    name: "Johto Master",
    description: "Complete all levels in Johto Region",
    icon: "🟡",
    rarity: "rare",
    requirement: { type: "region", value: "johto" },
  },
  {
    id: "hoenn-champion",
    name: "Hoenn Champion",
    description: "Complete all levels in Hoenn Region",
    icon: "🔵",
    rarity: "rare",
    requirement: { type: "region", value: "hoenn" },
  },
  {
    id: "sinnoh-legend",
    name: "Sinnoh Legend",
    description: "Complete all levels in Sinnoh Region",
    icon: "🟢",
    rarity: "epic",
    requirement: { type: "region", value: "sinnoh" },
  },
  {
    id: "unova-hero",
    name: "Unova Hero",
    description: "Complete all levels in Unova Region",
    icon: "🟣",
    rarity: "epic",
    requirement: { type: "region", value: "unova" },
  },
  {
    id: "kalos-elite",
    name: "Kalos Elite",
    description: "Complete all levels in Kalos Region",
    icon: "🟠",
    rarity: "epic",
    requirement: { type: "region", value: "kalos" },
  },
  {
    id: "alola-grand-master",
    name: "Alola Grand Master",
    description: "Complete all levels in Alola Region",
    icon: "⚡",
    rarity: "legendary",
    requirement: { type: "region", value: "alola" },
  },
  // XP Milestones
  {
    id: "xp-100",
    name: "Rising Star",
    description: "Earn 100 XP",
    icon: "⭐",
    rarity: "common",
    requirement: { type: "xp", value: 100 },
  },
  {
    id: "xp-500",
    name: "Shining Bright",
    description: "Earn 500 XP",
    icon: "✨",
    rarity: "rare",
    requirement: { type: "xp", value: 500 },
  },
  {
    id: "xp-1000",
    name: "Supernova",
    description: "Earn 1000 XP",
    icon: "💫",
    rarity: "epic",
    requirement: { type: "xp", value: 1000 },
  },
  {
    id: "xp-2000",
    name: "Cosmic Power",
    description: "Earn 2000 XP",
    icon: "🌟",
    rarity: "legendary",
    requirement: { type: "xp", value: 2000 },
  },
  // Difficulty Badges
  {
    id: "easy-10",
    name: "Warmup Warrior",
    description: "Complete 10 easy challenges",
    icon: "🌱",
    rarity: "common",
    requirement: { type: "difficulty", value: "easy-10" },
  },
  {
    id: "medium-10",
    name: "Moderate Master",
    description: "Complete 10 medium challenges",
    icon: "🔥",
    rarity: "rare",
    requirement: { type: "difficulty", value: "medium-10" },
  },
  {
    id: "hard-10",
    name: "Hardmode Hero",
    description: "Complete 10 hard challenges",
    icon: "💪",
    rarity: "epic",
    requirement: { type: "difficulty", value: "hard-10" },
  },
  // Special Achievements
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Complete a level in under 5 minutes",
    icon: "⚡",
    rarity: "rare",
    requirement: { type: "special", value: "fast-completion" },
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Complete 10 levels without hints",
    icon: "💎",
    rarity: "epic",
    requirement: { type: "special", value: "no-hints-10" },
  },
  {
    id: "pokemon-master",
    name: "Pokemon Master",
    description: "Complete all 100 levels",
    icon: "👑",
    rarity: "legendary",
    requirement: { type: "levels", value: 100 },
  },
  {
    id: "code-ninja",
    name: "Code Ninja",
    description: "Complete 25 levels",
    icon: "🥷",
    rarity: "rare",
    requirement: { type: "levels", value: 25 },
  },
  {
    id: "algorithm-wizard",
    name: "Algorithm Wizard",
    description: "Complete 50 levels",
    icon: "🧙",
    rarity: "epic",
    requirement: { type: "levels", value: 50 },
  },
  {
    id: "data-structure-sage",
    name: "Data Structure Sage",
    description: "Complete 75 levels",
    icon: "🧘",
    rarity: "epic",
    requirement: { type: "levels", value: 75 },
  },
]

export function checkBadgeUnlocked(
  badge: Badge,
  stats: {
    completedLevels: number[]
    userXP: number
    completedByDifficulty: { easy: number; medium: number; hard: number }
    completedRegions: string[]
  },
): boolean {
  const { requirement } = badge
  const { completedLevels, userXP, completedByDifficulty, completedRegions } = stats

  switch (requirement.type) {
    case "levels":
      return completedLevels.length >= (requirement.value as number)
    case "xp":
      return userXP >= (requirement.value as number)
    case "region":
      return completedRegions.includes(requirement.value as string)
    case "difficulty":
      const [diff, count] = (requirement.value as string).split("-")
      return completedByDifficulty[diff as keyof typeof completedByDifficulty] >= Number.parseInt(count)
    case "special":
      // Special achievements would need additional tracking
      return false
    default:
      return false
  }
}

export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "text-muted"
    case "rare":
      return "text-accent"
    case "epic":
      return "text-psychic"
    case "legendary":
      return "text-secondary"
  }
}

export function getRarityGlow(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "glow-water"
    case "rare":
      return "glow-water"
    case "epic":
      return "glow-psychic"
    case "legendary":
      return "glow-electric"
  }
}
