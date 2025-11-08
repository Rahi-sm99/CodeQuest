import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const { userMessage, code, language, testResults, errorMessage } = await request.json()

    const genKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
    if (!genKey) {
      return Response.json({ success: false, message: "Generative AI API key not configured. Set GOOGLE_GENERATIVE_AI_API_KEY in server env." }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(genKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Build context for Gemini to understand the coding issue
    const systemPrompt = `You are CodeBot, a friendly gaming-themed AI assistant helping users learn to code through debugging. 
Your role is to:
1. Identify and explain errors in their code (NOT fix them for them)
2. Teach the concept behind what went wrong
3. Guide them toward the solution without giving the answer
4. Be encouraging and use gaming terminology

When analyzing code:
- Point out the specific line or logic issue
- Explain WHY it's wrong
- Give hints on what to check or research
- Never provide the complete corrected code

Keep responses concise (2-3 sentences max) and in a gaming vibe.`

    const contextMessage = `
USER'S CODE (${language}):
\`\`\`${language}
${code}
\`\`\`

${errorMessage ? `COMPILATION ERROR:\n${errorMessage}` : ""}

${testResults ? `TEST RESULTS:\n${testResults}` : ""}

USER QUESTION: ${userMessage}
`

    const result = await model.generateContent(`${systemPrompt}\n\n${contextMessage}`)
    const response = await result.response
    const text = response.text()

    return Response.json({
      success: true,
      message: text.trim(),
    })
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return Response.json(
      {
        success: false,
        message: "Chat service is temporarily unavailable. Try again!",
      },
      { status: 500 },
    )
  }
}
