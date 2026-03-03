'use server';

import { z } from 'zod';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiLaunchStrategyInputSchema = z.object({
  podcastNiche: z.string().describe('The niche or category of the podcast.'),
  targetAudience: z.string().describe('A description of the target audience.'),
  languages: z.array(z.string()).describe('List of preferred languages for the content.'),
  tone: z.enum(['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational']).describe('The desired tone of the podcast.'),
  postingFrequency: z.enum(['Daily', 'Weekly', 'Bi-Weekly', 'Monthly']).describe('How often the user plans to post new episodes.'),
  platformPriority: z.array(z.enum(['Instagram', 'LinkedIn', 'YouTube', 'Twitter'])).describe('The social media platforms to prioritize.'),
  expertiseLevel: z.enum(['Beginner', 'Intermediate', 'Expert']).describe("The user's expertise level in their podcasting niche."),
  brandColors: z.object({
    primary: z.string().describe('Primary brand color in hex format.'),
    accent: z.string().describe('Accent brand color in hex format.'),
  }).describe('The brand colors for visual content.'),
});
export type AiLaunchStrategyInput = z.infer<typeof AiLaunchStrategyInputSchema>;

const AiLaunchStrategyOutputSchema = z.object({
  podcastFormat: z.string().describe("A suggested format for the podcast (e.g., Interview, Solo, Panel Discussion)."),
  episodeStructure: z.object({
    intro: z.string().describe("Suggestion for the episode intro."),
    segments: z.array(z.string()).describe("Suggested segments for the episode."),
    outro: z.string().describe("Suggestion for the episode outro."),
  }).describe("An ideal structure for a typical episode."),
  contentPlan: z.array(z.object({
    day: z.number(),
    idea: z.string(),
    platform: z.string(),
  })).describe("A 30-day content plan with ideas for different platforms."),
  guestRecommendations: z.array(z.string()).describe("A list of 5 potential guest recommendations relevant to the niche."),
  episodeThemes: z.array(z.string()).describe("A list of 5 potential episode themes to explore."),
  postingStrategy: z.object({
    recommendation: z.string().describe("A recommendation for the best day and time to post based on the target audience and platforms."),
    reasoning: z.string().describe("The reasoning behind the posting strategy recommendation.")
  }).describe("A strategy for when to post content for maximum impact.")
});
export type AiLaunchStrategyOutput = z.infer<typeof AiLaunchStrategyOutputSchema>;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  }
});

/**
 * Orchestrates the AI generation of a launch strategy.
 * Now runs directly on the server to avoid relative URL issues.
 */
export async function generateLaunchStrategy(input: AiLaunchStrategyInput): Promise<AiLaunchStrategyOutput> {
  try {
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

    // Clean markdown if present and parse
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(jsonString) as AiLaunchStrategyOutput;

  } catch (error: any) {
    console.error("Gemini Generation Error (Flow):", error);
    throw new Error(error.message || "Failed to generate launch strategy");
  }
}
