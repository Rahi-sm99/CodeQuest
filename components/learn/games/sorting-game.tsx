"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

interface SortingGameProps {
  sortType: string
  onScore: (points: number) => void
}

export function SortingGame({ sortType, onScore }: SortingGameProps) {
  const [array, setArray] = useState<number[]>([])
  const [comparing, setComparing] = useState<[number, number] | null>(null)
  const [sorted, setSorted] = useState<number[]>([])
  const [swapCount, setSwapCount] = useState(0)

  useEffect(() => {
    generateArray()
  }, [])

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10)
    setArray(newArray)
    setSorted([])
    setSwapCount(0)
    setComparing(null)
  }

  const handleSwap = (i: number, j: number) => {
    const newArray = [...array]
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    setArray(newArray)
    setSwapCount(swapCount + 1)

    // Check if sorted
    const isSorted = newArray.every((val, idx) => idx === 0 || val >= newArray[idx - 1])
    if (isSorted) {
      onScore(300 - swapCount * 10)
      setSorted(newArray)
    }
  }

  const handleBarClick = (index: number) => {
    if (sorted.length > 0) return

    if (comparing === null) {
      setComparing([index, -1])
    } else if (comparing[1] === -1) {
      setComparing([comparing[0], index])
    } else {
      handleSwap(comparing[0], comparing[1])
      setComparing(null)
    }
  }

  return (
    <Card className="p-8 border-2 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)] bg-slate-900/80">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-gaming text-white mb-2">{sortType} Challenge</h3>
          <p className="text-slate-300 text-sm">Click two bars to swap them. Sort in ascending order!</p>
        </div>

        {/* Array Visualization */}
        <div className="h-64 flex items-end justify-center gap-2 bg-slate-950/50 rounded-lg border-2 border-orange-400/30 p-6">
          {array.map((value, index) => (
            <div
              key={index}
              onClick={() => handleBarClick(index)}
              className={`flex-1 cursor-pointer transition-all hover:opacity-80 rounded-t-lg flex flex-col items-center justify-end ${
                comparing?.[0] === index || comparing?.[1] === index
                  ? "bg-yellow-400 scale-105"
                  : sorted.length > 0
                    ? "bg-green-500"
                    : "bg-orange-500"
              }`}
              style={{ height: `${(value / 100) * 100}%` }}
            >
              <span className="text-white font-bold text-xs mb-1">{value}</span>
            </div>
          ))}
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center justify-between">
          <div className="text-slate-300">
            Swaps: <span className="text-orange-400 font-mono">{swapCount}</span>
          </div>
          <Button onClick={generateArray} variant="outline" className="bg-slate-800 border-slate-600">
            <Shuffle className="w-4 h-4 mr-2" />
            New Array
          </Button>
        </div>

        {sorted.length > 0 && (
          <div className="p-4 bg-green-500/20 border-2 border-green-400 rounded-lg text-center">
            <p className="text-green-400 font-gaming text-lg">
              Sorted in {swapCount} swaps! +{300 - swapCount * 10} XP
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
