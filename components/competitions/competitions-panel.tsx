"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Competition {
  id: string
  players: number
  entry: number
  pool: number
  payouts: number[]
}

export function CompetitionsPanel() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [players, setPlayers] = useState(2)
  const [entry, setEntry] = useState(20)

  const entryOptions = [20, 50, 100]

  function calcPayouts(players: number, entry: number) {
    const pool = players * entry
    // Winner takes 70%, remaining 30% split equally among others
    const winner = Math.round(pool * 0.7)
    const restTotal = pool - winner
    const perOther = players > 1 ? Math.round(restTotal / (players - 1)) : 0
    const payouts = [winner]
    for (let i = 1; i < players; i++) payouts.push(perOther)
    return { pool, payouts }
  }

  const createCompetition = () => {
    const { pool, payouts } = calcPayouts(players, entry)
    const comp: Competition = {
      id: Date.now().toString(),
      players,
      entry,
      pool,
      payouts,
    }
    setCompetitions((s) => [comp, ...s])
  }

  return (
    <Card className="clean-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-foreground">Competitions</h3>
        <div className="text-sm text-muted-foreground">Create friendly matches with entry fees</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Players</label>
          <select
            value={players}
            onChange={(e) => setPlayers(Number(e.target.value))}
            className="w-full rounded px-3 py-2 bg-card/60"
          >
            {[2, 3, 4].map((p) => (
              <option key={p} value={p}>
                {p} players
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Entry amount (Rs)</label>
          <select
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
            className="w-full rounded px-3 py-2 bg-card/60"
          >
            {entryOptions.map((opt) => (
              <option key={opt} value={opt}>
                Rs {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button onClick={createCompetition} className="w-full">
            Create Competition
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {competitions.length === 0 ? (
          <div className="text-sm text-muted-foreground">No active competitions. Create one to get started.</div>
        ) : (
          competitions.map((c) => (
            <Card key={c.id} className="p-3 bg-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{c.players} players · Rs {c.entry} entry</div>
                  <div className="text-xs text-muted-foreground">Pool: Rs {c.pool}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Payouts</div>
                  <div className="text-sm font-mono font-bold">
                    {c.payouts.map((p, i) => (
                      <div key={i}>{i === 0 ? `Winner: Rs ${p}` : `#${i + 1}: Rs ${p}`}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  )
}
