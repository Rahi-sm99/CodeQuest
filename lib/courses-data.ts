import type { Course, Lesson } from "./user-data"

export const COURSES: Course[] = [
  {
    id: "python-basics",
    title: "Python Basics",
    description: "Learn the fundamentals of Python programming",
    language: "Python",
    difficulty: "Beginner",
    totalXP: 500,
    badge: "Python Beginner",
    chapters: [
      { id: "ch1", title: "Hello World", lessonCount: 5, xp: 50, isLocked: false },
      { id: "ch2", title: "Variables & Types", lessonCount: 8, xp: 80, isLocked: false },
      { id: "ch3", title: "Control Flow", lessonCount: 10, xp: 100, isLocked: false },
      { id: "ch4", title: "Functions", lessonCount: 12, xp: 120, isLocked: false },
      { id: "ch5", title: "Lists & Loops", lessonCount: 15, xp: 150, isLocked: false },
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Master arrays, linked lists, trees, and more",
    language: "Python",
    difficulty: "Intermediate",
    totalXP: 800,
    badge: "DS Master",
    chapters: [
      { id: "ds1", title: "Arrays", lessonCount: 10, xp: 100, isLocked: false },
      { id: "ds2", title: "Linked Lists", lessonCount: 12, xp: 120, isLocked: false },
      { id: "ds3", title: "Stacks & Queues", lessonCount: 10, xp: 100, isLocked: false },
      { id: "ds4", title: "Trees", lessonCount: 15, xp: 150, isLocked: false },
      { id: "ds5", title: "Graphs", lessonCount: 18, xp: 180, isLocked: false },
      { id: "ds6", title: "Hash Tables", lessonCount: 15, xp: 150, isLocked: false },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    description: "Sorting, searching, and algorithmic thinking",
    language: "Python",
    difficulty: "Intermediate",
    totalXP: 900,
    badge: "Algo Expert",
    chapters: [
      { id: "alg1", title: "Sorting Algorithms", lessonCount: 12, xp: 120, isLocked: false },
      { id: "alg2", title: "Binary Search", lessonCount: 10, xp: 100, isLocked: false },
      { id: "alg3", title: "Recursion", lessonCount: 15, xp: 150, isLocked: false },
      { id: "alg4", title: "Dynamic Programming", lessonCount: 20, xp: 200, isLocked: false },
      { id: "alg5", title: "Greedy Algorithms", lessonCount: 18, xp: 180, isLocked: false },
      { id: "alg6", title: "Graph Algorithms", lessonCount: 15, xp: 150, isLocked: false },
    ],
  },
]

// Sample lessons for demo
export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: "lesson1",
    chapterId: "ch1",
    title: "Print Hello World",
    xp: 10,
    difficulty: "Easy",
    isCompleted: false,
    problem: {
      description: "Your first coding challenge! Print 'Hello World' to the console.",
      examples: [{ input: "None", output: "Hello World" }],
      hints: ["Use the print() function", "Don't forget the quotes around your text"],
      starterCode: "# Write your code here\n",
      testCases: [{ input: "", expectedOutput: "Hello World" }],
    },
  },
]
