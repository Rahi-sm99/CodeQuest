export interface Certification {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
  earnedDate?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "dsa-fundamentals",
    name: "DSA Fundamentals",
    description: "Mastered core data structures and algorithms",
    icon: "🎓",
    requirement: "Complete all Basics and Control Flow topics",
  },
  {
    id: "algorithm-master",
    name: "Algorithm Master",
    description: "Expert in sorting, searching, and optimization",
    icon: "⚡",
    requirement: "Complete all Algorithm topics",
  },
  {
    id: "data-structure-pro",
    name: "Data Structure Professional",
    description: "Proficient in advanced data structures",
    icon: "📊",
    requirement: "Complete all Data Structure topics",
  },
  {
    id: "graph-expert",
    name: "Graph Theory Expert",
    description: "Mastered graph algorithms and traversals",
    icon: "🕸️",
    requirement: "Complete all Graph topics including BFS/DFS",
  },
  {
    id: "dp-champion",
    name: "Dynamic Programming Champion",
    description: "Expert in optimization and memoization",
    icon: "💎",
    requirement: "Complete all Dynamic Programming topics",
  },
  {
    id: "codequest-master",
    name: "CodeQuest Master",
    description: "Completed entire DSA curriculum",
    icon: "👑",
    requirement: "Complete all 100 levels",
  },
]
