import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const { code, language, errorOutput } = await request.json()

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `Analyze this code compilation/runtime error and provide a brief, gaming-style explanation of what went wrong and one hint to fix it. Keep it under 100 words.

Language: ${language}
Code:
\`\`\`${language}
${code}
\`\`\`

Error:
${errorOutput}

Respond in a fun gaming tone, starting with an emoji.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return Response.json({
      success: true,
      analysis: text.trim(),
    })
  } catch (error) {
    console.error("[v0] Error analysis failed:", error)
    return Response.json(
      {
        success: false,
        analysis: "Error analysis unavailable",
      },
      { status: 500 },
    )
  }
}
