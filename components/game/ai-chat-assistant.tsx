"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AIChatAssistantProps {
  code: string
  language: string
  testResults?: any
  errorMessage?: string
}

interface ChatMessage {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}

export function AIChatAssistant({ code, language, testResults, errorMessage }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "bot",
      content: "BEEP BOOP! I'm CodeBot. Need help debugging? Ask me anything about your code!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Analyze error when it appears
  useEffect(() => {
    if (errorMessage && isOpen) {
      analyzeError()
    }
  }, [errorMessage, isOpen])

  const analyzeError = async () => {
    if (!errorMessage || !code) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          errorOutput: errorMessage,
        }),
      })

      const data = await response.json()
      if (data.success) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          role: "bot",
          content: data.analysis,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newMessage])
      }
    } catch (error) {
      console.error("[v0] Error analysis failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input,
          code,
          language,
          testResults: testResults ? JSON.stringify(testResults) : "",
          errorMessage: errorMessage || "",
        }),
      })

      const data = await response.json()
      if (data.success) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Robot Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-hard">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 p-0 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground hover:shadow-lg shadow-lg glow-primary pixel-border font-gaming text-2xl hover-lift"
          title="Open CodeBot"
        >
          🤖
        </Button>
      </div>

      {/* Chat Slider Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] animate-slide-in-up">
          <Card className="h-full flex flex-col bg-gradient-to-br from-card via-[#1a1f3a] to-card border-2 border-primary glow-primary pixel-border shadow-2xl">
            {/* Header with Robot */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b-2 border-primary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-pulse">🤖</span>
                <div>
                  <h3 className="font-gaming text-sm text-primary glow-text">CODEBOT v1.0</h3>
                  <p className="text-xs text-muted font-pixel">Debug Assistant</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                className="p-0 w-6 h-6 text-accent hover:text-primary text-lg hover-lift"
              >
                ✕
              </Button>
            </div>

            {/* Status Badge */}
            <div className="px-4 pt-3 flex gap-2">
              <Badge className="bg-primary/20 text-primary border-primary font-pixel text-xs">
                {language.toUpperCase()}
              </Badge>
              {errorMessage && (
                <Badge className="bg-destructive/20 text-destructive border-destructive font-pixel text-xs">
                  ERROR DETECTED
                </Badge>
              )}
              {testResults?.passed && (
                <Badge className="bg-primary/20 text-primary border-primary font-pixel text-xs">TESTS PASSED</Badge>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-input/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded font-pixel text-xs ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-primary text-foreground rounded-bl-none glow-text"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-primary px-4 py-2 rounded-bl-none rounded font-pixel text-xs text-muted">
                    🤖 thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-primary p-3 space-y-2 bg-card/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask for help..."
                  className="flex-1 bg-input text-foreground px-3 py-2 border border-primary/30 font-pixel text-xs rounded focus:outline-none focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-pixel text-xs px-3 hover-lift"
                >
                  →
                </Button>
              </div>
              <p className="text-xs text-muted/70 font-pixel text-center">I won't solve it. I'll teach you!</p>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
