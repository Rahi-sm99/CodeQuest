export async function POST(request: Request) {
  try {
    const { code, language, stdin } = await request.json()

    // Language ID mapping for Judge0
    const languageMap: { [key: string]: number } = {
      python: 71,
      javascript: 63,
      cpp: 54,
      java: 62,
      csharp: 51,
      c: 50,
      go: 60,
    }

    const languageId = languageMap[language] || 71

    // Ensure Judge0 API key is configured
    const judge0Key = process.env.JUDGE0_API_KEY || ""
    if (!judge0Key) {
      return Response.json({ success: false, error: "Judge0 API key not configured. Set JUDGE0_API_KEY in server env." }, { status: 500 })
    }

    // Submit code to Judge0
    const submitResponse = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": judge0Key,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: Buffer.from(code).toString("base64"),
        stdin: stdin ? Buffer.from(stdin).toString("base64") : undefined,
      }),
    })

    if (!submitResponse.ok) {
      throw new Error("Failed to execute code")
    }

    const result = await submitResponse.json()

    // Decode output
    const output = result.stdout ? Buffer.from(result.stdout, "base64").toString() : ""
    const error = result.stderr ? Buffer.from(result.stderr, "base64").toString() : ""

    return Response.json({
      success: true,
      output: output.trim(),
      error: error.trim(),
      status: result.status?.id,
    })
  } catch (error) {
    console.error("[v0] Code execution error:", error)
    return Response.json({ success: false, error: "Code execution failed. Using demo mode." }, { status: 500 })
  }
}
