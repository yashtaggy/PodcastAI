import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

export async function POST(req: Request) {
    try {
        const input = await req.json();

        const prompt = `You are a world-class podcast launch strategist. Based on the following user preferences, generate a comprehensive launch strategy.

        User Preferences:
        - Podcast Niche: ${input.podcastNiche}
        - Target Audience: ${input.targetAudience}
        - Expertise Level: ${input.expertiseLevel}
        - Languages: ${JSON.stringify(input.languages)}
        - Tone: ${input.tone}
        - Desired Posting Frequency: ${input.postingFrequency}
        - Platform Priority: ${JSON.stringify(input.platformPriority)}
        - Brand Colors: Primary: ${input.brandColors?.primary}, Accent: ${input.brandColors?.accent}

        Generate the following strategy components in the exact JSON format specified below:
        1. podcastFormat: A string recommending the best format (e.g., Interview, Solo, Panel).
        2. episodeStructure: { intro: string, segments: string[], outro: string }
        3. contentPlan: An array of 10-15 objects with { day: number, idea: string, platform: string } spread across early weeks.
        4. guestRecommendations: Array of 5 strings (archetypes or specific roles).
        5. episodeThemes: Array of 5 strings.
        6. postingStrategy: { recommendation: string, reasoning: string }

        JSON structure:
        {
            "podcastFormat": "...",
            "episodeStructure": {
                "intro": "...",
                "segments": ["...", "..."],
                "outro": "..."
            },
            "contentPlan": [
                { "day": 1, "idea": "...", "platform": "..." },
                ...
            ],
            "guestRecommendations": ["...", "..."],
            "episodeThemes": ["...", "..."],
            "postingStrategy": {
                "recommendation": "...",
                "reasoning": "..."
            }
        }

        Be creative and specific to the niche. If Indian languages are selected, use that context.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown if present
        const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
        const strategy = JSON.parse(jsonString);

        return NextResponse.json(strategy);

    } catch (error: any) {
        console.error("Gemini Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate strategy" }, { status: 500 });
    }
}
