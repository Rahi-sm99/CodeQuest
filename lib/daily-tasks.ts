import { DSA_LEVELS, type DSALevel } from "./dsa-levels"

export interface DailyChallenge {
  id: string
  day: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  concept: string
  problemIds: number[]
  reward: number
  difficulty: "easy" | "medium" | "hard" | "expert"
  description: string
  icon: string
}

export interface WeeklyTask {
  id: string
  title: string
  description: string
  requirement: number
  reward: number
  icon: string
  type: "complete_levels" | "earn_xp" | "solve_concept" | "daily_streak"
  concept?: string
}

export interface TaskProgress {
  dailyChallenges: Record<string, { completed: boolean; completedAt?: string }>
  weeklyTasks: Record<string, { progress: number; completed: boolean }>
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string
}

// Daily challenges - one for each day of the week
export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: "monday_arrays",
    day: "MON",
    dayOfWeek: 1,
    concept: "Arrays",
    problemIds: [10, 11, 12],
    reward: 50,
    difficulty: "easy",
    description: "Master array manipulation basics",
    icon: "📊",
  },
  {
    id: "tuesday_strings",
    day: "TUE",
    dayOfWeek: 2,
    concept: "Strings",
    problemIds: [20, 21, 22],
    reward: 60,
    difficulty: "medium",
    description: "String processing challenges",
    icon: "📝",
  },
  {
    id: "wednesday_linkedlists",
    day: "WED",
    dayOfWeek: 3,
    concept: "Linked Lists",
    problemIds: [30, 31, 32],
    reward: 75,
    difficulty: "hard",
    description: "Linked list operations",
    icon: "🔗",
  },
  {
    id: "thursday_stacks",
    day: "THU",
    dayOfWeek: 4,
    concept: "Stacks & Queues",
    problemIds: [40, 41, 42],
    reward: 70,
    difficulty: "medium",
    description: "Stack and queue problems",
    icon: "📚",
  },
  {
    id: "friday_trees",
    day: "FRI",
    dayOfWeek: 5,
    concept: "Trees",
    problemIds: [50, 51, 52],
    reward: 100,
    difficulty: "expert",
    description: "Tree traversal and manipulation",
    icon: "🌳",
  },
  {
    id: "saturday_graphs",
    day: "SAT",
    dayOfWeek: 6,
    concept: "Graphs",
    problemIds: [60, 61, 62],
    reward: 120,
    difficulty: "expert",
    description: "Graph algorithms challenge",
    icon: "🕸️",
  },
  {
    id: "sunday_dp",
    day: "SUN",
    dayOfWeek: 0,
    concept: "Dynamic Programming",
    problemIds: [70, 71, 72],
    reward: 150,
    difficulty: "expert",
    description: "Dynamic programming mastery",
    icon: "💎",
  },
]

// Weekly tasks that reset every week
export const WEEKLY_TASKS: WeeklyTask[] = [
  {
    id: "complete_10_levels",
    title: "LEVEL CRUSHER",
    description: "Complete 10 levels this week",
    requirement: 10,
    reward: 200,
    icon: "🎯",
    type: "complete_levels",
  },
  {
    id: "earn_500_xp",
    title: "XP HUNTER",
    description: "Earn 500 XP this week",
    requirement: 500,
    reward: 150,
    icon: "⚡",
    type: "earn_xp",
  },
  {
    id: "solve_arrays",
    title: "ARRAY MASTER",
    description: "Solve 5 array problems",
    requirement: 5,
    reward: 100,
    icon: "📊",
    type: "solve_concept",
    concept: "Arrays",
  },
  {
    id: "daily_streak_7",
    title: "CONSISTENCY KING",
    description: "Maintain a 7-day streak",
    requirement: 7,
    reward: 300,
    icon: "🔥",
    type: "daily_streak",
  },
]

// Get today's daily challenge
export function getTodayChallenge(): DailyChallenge {
  const today = new Date().getDay()
  return DAILY_CHALLENGES.find((c) => c.dayOfWeek === today) || DAILY_CHALLENGES[0]
}

// Get problems for a specific challenge
export function getChallengeProblems(challenge: DailyChallenge): DSALevel[] {
  return challenge.problemIds.map((id) => DSA_LEVELS.find((level) => level.id === id)).filter(Boolean) as DSALevel[]
}

// Check if a challenge is completed
export function isChallengeCompleted(challenge: DailyChallenge, completedLevels: number[]): boolean {
  return challenge.problemIds.every((id) => completedLevels.includes(id))
}

// Calculate streak
export function calculateStreak(lastCompletedDate: string): number {
  if (!lastCompletedDate) return 0

  const last = new Date(lastCompletedDate)
  const today = new Date()

  // Reset time to midnight for accurate day comparison
  last.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - last.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // If last completion was yesterday or today, streak continues
  if (diffDays <= 1) {
    return 1
  }

  // Streak broken
  return 0
}

// Get weekly task progress
export function getWeeklyTaskProgress(
  task: WeeklyTask,
  completedLevels: number[],
  userXP: number,
  currentStreak: number,
): number {
  switch (task.type) {
    case "complete_levels":
      return Math.min(completedLevels.length, task.requirement)
    case "earn_xp":
      return Math.min(userXP, task.requirement)
    case "solve_concept":
      if (!task.concept) return 0
      const conceptLevels = DSA_LEVELS.filter((level) => level.concept === task.concept)
      const completedConceptLevels = conceptLevels.filter((level) => completedLevels.includes(level.id))
      return Math.min(completedConceptLevels.length, task.requirement)
    case "daily_streak":
      return Math.min(currentStreak, task.requirement)
    default:
      return 0
  }
}
