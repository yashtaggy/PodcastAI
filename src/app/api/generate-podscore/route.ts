import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rawTranscript, structuredTranscript } = await req.json();

    if (!rawTranscript) {
      return NextResponse.json(
        { error: "Transcript missing" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key missing on server" },
        { status: 500 }
      );
    }

    const prompt = `
You are an advanced Podcast Intelligence Engine.

Analyze the transcript and return STRICT JSON ONLY.

Return in EXACTLY this structure:

{
  "podScore": {
    "overall": { "score": number, "explanation": string },
    "questionQuality": { "score": number, "explanation": string },
    "domainDepth": { "score": number, "explanation": string },
    "keywordRelevance": { "score": number, "explanation": string },
    "emotionalEngagement": { "score": number, "explanation": string },
    "voiceTone": { "score": number, "explanation": string },
    "clarity": { "score": number, "explanation": string }
  },
  "improvementIntelligence": string[],
  "engagementTimeline": [
    {
      "timestamp": number,
      "eventType": string,
      "description": string
    }
  ],
  "cleanTranscript": [
    {
      "speaker": string,
      "text": string
    }
  ]
}

Rules:
- Scores must be 0–100.
- Be critical and realistic.
- Detect strong insights, emotional peaks, opinion shifts.
- Use timestamps logically.
- Clean transcript should group sentences per speaker.
- Do NOT return markdown.
- Do NOT add commentary outside JSON.

Transcript:
${rawTranscript}

Structured Transcript With Timestamps:
${JSON.stringify(structuredTranscript)}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI ERROR:", data);
      return NextResponse.json(
        { error: "AI API failed" },
        { status: 500 }
      );
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("EMPTY AI RESPONSE:", data);
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("GENERATION ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}