import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      podcastTopic,
      cleanTranscript,
      engagementTimeline,
      platforms,
      brandTone,
      targetAudience,
    } = body;

    const formattedTranscript = Array.isArray(cleanTranscript)
      ? cleanTranscript.map((t: any) => `${t.speaker}: ${t.text}`).join("\n")
      : cleanTranscript;

    const formattedTimeline = Array.isArray(engagementTimeline)
      ? engagementTimeline
        .map(
          (e: any) =>
            `- At ${Math.floor(e.timestamp / 60)}m${e.timestamp % 60}s: ${e.eventType
            } - ${e.description}`
        )
        .join("\n")
      : JSON.stringify(engagementTimeline);

    const prompt = `
You are a world-class podcast content repurposing strategist.

Generate a complete Authority Engine content package.

INPUT:
Podcast Topic: ${podcastTopic}
Target Audience: ${targetAudience}
Brand Tone: ${brandTone}

Transcript:
${formattedTranscript}

Engagement Timeline:
${formattedTimeline}

OUTPUT FORMAT (Return STRICT JSON only):

{
  "extractedClips": [
    {
      "clipCategory": "Insight | Opinion | Story | Quote",
      "timestamp": 123, 
      "description": "Short description",
      "transcriptSnippet": "Exact snippet"
    }
  ],
  "instagram": {
    "reelScripts": ["Script 1", "Script 2"],
    "hookVariations": ["Hook 1", "Hook 2", "Hook 3"],
    "captionVariations": ["Caption 1", "Caption 2"],
    "hashtags": ["#tag1", "#tag2"],
    "simulatedReactions": ["Comment 1", "Comment 2"]
  },
  "linkedin": {
    "authorityPost": "Post content",
    "storytellingPost": "Post content",
    "simulatedReactions": ["Comment 1"]
  },
  "twitter": {
    "tweetThread": "Tweet 1\n\nTweet 2...",
    "quoteTweet": "Quote content",
    "simulatedReactions": ["Comment 1"]
  },
  "youtube": {
    "shortScripts": ["Script 1"],
    "titleIdeas": ["Title 1", "Title 2"],
    "simulatedReactions": ["Comment 1"]
  }
}

CONSTRAINTS:
1. "timestamp" MUST be a number (seconds from start). No strings like "1m 30s".
2. Generate EXACTLY 3 extractedClips.
3. For Instagram: 2 reelScripts, 3 hooks, 2 captions.
4. For YouTube: 1-2 shortScripts.
5. Only include platforms requested in the input: ${platforms.join(", ")}.
6. Return ONLY the JSON object.
`;

    const response = await cohere.v2.chat({
      model: "command-r-plus-08-2024",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: { type: "json_object" },
      temperature: 0.7,
      maxTokens: 4000,
    });

    const item = response.message?.content?.[0];
    const text = item?.type === "text" ? item.text : "";

    if (!text) {
      throw new Error("No response content from Cohere");
    }

    // Attempt to parse the JSON, cleaning markdown blocks if necessary
    let parsed;
    try {
      const cleanedText = text.replace(/```json\n?|```/g, "").trim();
      parsed = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("Invalid JSON response from AI");
    }

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("Authority Engine Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}