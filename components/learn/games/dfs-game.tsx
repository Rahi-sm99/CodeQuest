"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DFSGameProps {
  onScore: (points: number) => void
}

export function DFSGame({ onScore }: DFSGameProps) {
  const [graph] = useState([
    { id: "A", x: 50, y: 10, neighbors: ["B", "C"] },
    { id: "B", x: 30, y: 40, neighbors: ["A", "D", "E"] },
    { id: "C", x: 70, y: 40, neighbors: ["A", "F"] },
    { id: "D", x: 20, y: 70, neighbors: ["B"] },
    { id: "E", x: 40, y: 70, neighbors: ["B", "G"] },
    { id: "F", x: 70, y: 70, neighbors: ["C"] },
    { id: "G", x: 40, y: 100, neighbors: ["E"] },
  ])
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [correctOrder] = useState(["A", "B", "D", "E", "G", "C", "F"])
  const [gameComplete, setGameComplete] = useState(false)

  const handleNodeClick = (nodeId: string) => {
    if (gameComplete || visitedOrder.includes(nodeId)) return

    const newOrder = [...visitedOrder, nodeId]
    setVisitedOrder(newOrder)

    if (newOrder.length === graph.length) {
      const isCorrect = newOrder.every((node, i) => node === correctOrder[i])
      if (isCorrect) {
        onScore(500)
        setGameComplete(true)
      }
    }
  }

  const handleReset = () => {
    setVisitedOrder([])
    setGameComplete(false)
  }

  return (
    <Card className="p-8 border-2 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-slate-900/80">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-gaming text-white mb-2">DFS Traversal Challenge</h3>
          <p className="text-slate-300 text-sm">Click nodes in DFS order starting from A</p>
          <p className="text-yellow-400 text-xs mt-2">Hint: Go as deep as possible before backtracking</p>
        </div>

        {/* Graph Visualization */}
        <div className="relative h-96 bg-slate-950/50 rounded-lg border-2 border-purple-400/30 p-4">
          <svg className="w-full h-full">
            {/* Draw edges */}
            {graph.map((node) =>
              node.neighbors.map((neighborId) => {
                const neighbor = graph.find((n) => n.id === neighborId)
                if (!neighbor || graph.indexOf(node) > graph.indexOf(neighbor)) return null
                return (
                  <line
                    key={`${node.id}-${neighborId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${neighbor.x}%`}
                    y2={`${neighbor.y}%`}
                    stroke="rgba(148, 163, 184, 0.3)"
                    strokeWidth="2"
                  />
                )
              }),
            )}

            {/* Draw nodes */}
            {graph.map((node) => {
              const isVisited = visitedOrder.includes(node.id)
              const visitIndex = visitedOrder.indexOf(node.id)

              return (
                <g key={node.id}>
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="25"
                    fill={isVisited ? "#a855f7" : "#1e293b"}
                    stroke={isVisited ? "#a855f7" : "#facc15"}
                    strokeWidth="3"
                    className="cursor-pointer hover:opacity-80 transition-all"
                    onClick={() => handleNodeClick(node.id)}
                  />
                  <text
                    x={`${node.x}%`}
                    y={`${node.y}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                    className="pointer-events-none font-gaming"
                  >
                    {node.id}
                  </text>
                  {isVisited && (
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 8}%`}
                      textAnchor="middle"
                      fill="#facc15"
                      fontSize="10"
                      className="pointer-events-none"
                    >
                      {visitIndex + 1}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-slate-300">
            Visited: <span className="text-purple-400 font-mono">{visitedOrder.join(" → ") || "None"}</span>
          </div>
          <Button onClick={handleReset} variant="outline" className="bg-slate-800 border-slate-600">
            Reset
          </Button>
        </div>

        {gameComplete && (
          <div className="p-4 bg-purple-500/20 border-2 border-purple-400 rounded-lg text-center">
            <p className="text-purple-400 font-gaming text-lg">Excellent! +500 XP</p>
          </div>
        )}
      </div>
    </Card>
  )
}
