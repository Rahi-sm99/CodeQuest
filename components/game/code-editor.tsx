"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  language: string
  onSubmit: () => void
  isSubmitting: boolean
  testResults: any
  compilationError?: string
}

export function CodeEditor({
  code,
  setCode,
  language,
  onSubmit,
  isSubmitting,
  testResults,
  compilationError,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const LANGUAGE_TEMPLATES = {
    python: '# Write your Python code here\nprint("Hello World")',
    javascript: '// Write your JavaScript code here\nconsole.log("Hello World")',
    cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}',
    java: 'public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    csharp:
      'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}',
    c: '#include <stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}',
    go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello World")\n}',
  }

  return (
    <Card className="h-full bg-card/95 border-2 flex flex-col overflow-hidden pixel-border glow-water rounded-2xl backdrop-blur-sm">
      <div className="border-b border-water/50 p-4 flex items-center justify-between gradient-water">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-white bg-white/20 text-white font-pixel text-xs pixel-border">
            💻 {language.charAt(0).toUpperCase() + language.slice(1)}
          </Badge>
          <span className="text-white text-xs font-pixel animate-pulse">▶ CODE EDITOR</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="text-white hover:bg-white/20 font-pixel text-xs hover-lift pixel-border"
          >
            {copied ? "✓ COPIED!" : "📋"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCode(LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES] || "")}
            className="text-white hover:bg-white/20 font-pixel text-xs hover-lift pixel-border"
          >
            🔄
          </Button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 bg-slate-900 text-electric p-4 font-mono text-sm resize-none focus:outline-none border-none"
        placeholder="// Write your code here and become a Pokemon Master!"
        spellCheck="false"
        style={{ caretColor: "#facc15" }}
      />

      {compilationError && (
        <div className="border-t-2 border-fire/50 gradient-fire p-4 font-pixel text-xs text-white animate-slide-in-bounce">
          <p className="font-bold mb-3 flex items-center gap-2 text-lg">
            <span className="text-2xl animate-thunder-bolt">⚠️</span>
            COMPILATION ERROR
          </p>
          <pre className="bg-slate-900/50 p-3 rounded-xl text-xs overflow-auto max-h-24 whitespace-pre-wrap break-words pixel-border">
            {compilationError}
          </pre>
        </div>
      )}

      {testResults && !compilationError && (
        <div
          className={`border-t-2 p-4 font-pixel text-xs animate-slide-in-bounce ${
            testResults.passed
              ? "gradient-grass border-grass text-white glow-grass"
              : "gradient-fire border-fire text-white glow-fire"
          }`}
        >
          <p className="font-bold text-base flex items-center gap-2">
            {testResults.passed ? (
              <>
                <span className="text-2xl animate-pikachu-bounce">✅</span> {testResults.message}
              </>
            ) : (
              <>
                <span className="text-2xl animate-thunder-bolt">❌</span> {testResults.message}
              </>
            )}
          </p>
          {testResults.output && (
            <pre className="text-xs mt-3 overflow-auto max-h-20 bg-slate-900/50 p-2 rounded pixel-border">
              {testResults.output}
            </pre>
          )}
        </div>
      )}

      <div className="border-t-2 border-primary/50 p-4 gradient-electric">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || !code.trim()}
          className="w-full gap-2 bg-slate-900 text-electric hover:bg-slate-800 font-pixel text-sm hover-lift pixel-border glow-electric disabled:opacity-50 py-6 font-bold"
        >
          {isSubmitting ? (
              <>
                <span className="animate-spin inline-block">⚡</span> EXECUTING CODE
                <span className="animate-spin inline-block">⚡</span>
              </>
            ) : (
              <>
                <span className="animate-pulse">▶️</span> SUBMIT CODE {" "}
                <span className="animate-pulse">⚡</span>
              </>
            )}
        </Button>
      </div>
    </Card>
  )
}
