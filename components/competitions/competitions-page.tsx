"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

interface Competition {
  id: string
  playersNeeded: number
  entry: number
  participants: string[]
  pool: number
  resolved?: boolean
  winner?: string
  winnerPayout?: number
}

export function CompetitionsPage() {
  const { user } = useAuth()
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [playersNeeded, setPlayersNeeded] = useState(2)
  const [entry, setEntry] = useState(20)

  const entryOptions = [20, 50, 100]

  function calcWinnerPayout(entry: number) {
    // Winner gets 1.5x of entry (20 -> 30, 50 -> 75? user requested 70 for 50—use 1.4 for 50?)
    // We'll follow provided examples: 20->30, 50->70, 100->150 -> roughly 1.5x for 20 & 100, 1.4x for 50.
    if (entry === 50) return 70
    return Math.round(entry * 1.5)
  }

  const createCompetition = () => {
    const payout = calcWinnerPayout(entry)
    const pool = playersNeeded * entry
    const comp: Competition = {
      id: Date.now().toString(),
      playersNeeded,
      entry,
      participants: [],
      pool,
      resolved: false,
      winner: undefined,
      winnerPayout: payout,
    }
    setCompetitions((s) => [comp, ...s])
  }

  const joinCompetition = (id: string) => {
    if (!user) return alert("Please login to join competitions")
    setCompetitions((prev) => {
      return prev.map((c) => {
        if (c.id !== id || c.resolved) return c
        if (c.participants.includes(user.email)) return c
        const newParticipants = [...c.participants, user.email]
        const updated = { ...c, participants: newParticipants }
        // If reached required players, resolve
        if (newParticipants.length >= c.playersNeeded) {
          const winnerIndex = Math.floor(Math.random() * newParticipants.length)
          const winner = newParticipants[winnerIndex]
          updated.resolved = true
          updated.winner = winner
          updated.winnerPayout = calcWinnerPayout(c.entry)
        }
        return updated
      })
    })
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="p-6 clean-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold">Competitions</h2>
            <p className="text-sm text-muted-foreground">Create or join competitions — winner takes the prize, platform keeps the rest.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Players</label>
            <select value={playersNeeded} onChange={(e) => setPlayersNeeded(Number(e.target.value))} className="w-full rounded px-3 py-2 bg-card/60">
              {[2, 3, 4].map((p) => (
                <option key={p} value={p}>{p} players</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Entry (Rs)</label>
            <select value={entry} onChange={(e) => setEntry(Number(e.target.value))} className="w-full rounded px-3 py-2 bg-card/60">
              {entryOptions.map((opt) => (
                <option key={opt} value={opt}>Rs {opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={createCompetition} className="w-full">Create Competition</Button>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {competitions.length === 0 ? (
          <div className="text-sm text-muted-foreground">No competitions yet. Create one to get started.</div>
        ) : (
          competitions.map((c) => (
            <Card key={c.id} className="p-4 bg-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{c.playersNeeded} players · Rs {c.entry} entry</div>
                  <div className="text-xs text-muted-foreground">Pool: Rs {c.pool}</div>
                </div>
                <div className="text-right">
                  {!c.resolved ? (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Joined: {c.participants.length}/{c.playersNeeded}</div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => joinCompetition(c.id)} disabled={c.participants.includes(user?.email || "")}>Join</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm font-bold">Winner: {c.winner} · Prize: Rs {c.winnerPayout}</div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
