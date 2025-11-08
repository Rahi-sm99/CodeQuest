"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BFSGameProps {
  onScore: (points: number) => void
}

export function BFSGame({ onScore }: BFSGameProps) {
  const [graph] = useState([
    { id: "A", x: 50, y: 20, neighbors: ["B", "C"] },
    { id: "B", x: 20, y: 60, neighbors: ["A", "D", "E"] },
    { id: "C", x: 80, y: 60, neighbors: ["A", "F"] },
    { id: "D", x: 10, y: 100, neighbors: ["B"] },
    { id: "E", x: 30, y: 100, neighbors: ["B"] },
    { id: "F", x: 80, y: 100, neighbors: ["C"] },
  ])
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [correctOrder] = useState(["A", "B", "C", "D", "E", "F"])
  const [gameComplete, setGameComplete] = useState(false)

  const handleNodeClick = (nodeId: string) => {
    if (gameComplete || visitedOrder.includes(nodeId)) return

    const newOrder = [...visitedOrder, nodeId]
    setVisitedOrder(newOrder)

    // Check if complete
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
    <Card className="p-8 border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-slate-900/80">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-gaming text-white mb-2">BFS Traversal Challenge</h3>
          <p className="text-slate-300 text-sm">Click nodes in BFS order starting from A</p>
          <p className="text-yellow-400 text-xs mt-2">Hint: Visit all neighbors at current level before going deeper</p>
        </div>

        {/* Graph Visualization */}
        <div className="relative h-96 bg-slate-950/50 rounded-lg border-2 border-blue-400/30 p-4">
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
            {graph.map((node, index) => {
              const isVisited = visitedOrder.includes(node.id)
              const visitIndex = visitedOrder.indexOf(node.id)

              return (
                <g key={node.id}>
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="30"
                    fill={isVisited ? "#10b981" : "#1e293b"}
                    stroke={isVisited ? "#10b981" : "#facc15"}
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
                    fontSize="20"
                    fontWeight="bold"
                    className="pointer-events-none font-gaming"
                  >
                    {node.id}
                  </text>
                  {isVisited && (
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 10}%`}
                      textAnchor="middle"
                      fill="#facc15"
                      fontSize="12"
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

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="text-slate-300">
            Visited: <span className="text-blue-400 font-mono">{visitedOrder.join(" → ") || "None"}</span>
          </div>
          <Button onClick={handleReset} variant="outline" className="bg-slate-800 border-slate-600">
            Reset
          </Button>
        </div>

        {gameComplete && (
          <div className="p-4 bg-green-500/20 border-2 border-green-400 rounded-lg text-center">
            <p className="text-green-400 font-gaming text-lg">Perfect! +500 XP</p>
          </div>
        )}
      </div>
    </Card>
  )
}
