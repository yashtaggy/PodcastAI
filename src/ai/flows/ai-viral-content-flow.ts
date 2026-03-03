'use server';
/**
 * @fileOverview A purified flow for viral content types, removing broken Genkit logic.
 */

import { z } from 'zod';

export const AiViralContentInputSchema = z.object({
  podcastTopic: z.string().describe("The main topic of the podcast episode."),
  targetAudience: z.string().describe("A description of the target audience."),
  cleanTranscript: z.array(z.object({
    speaker: z.string(),
    text: z.string(),
  })).describe("The clean, speaker-separated transcript."),
  engagementTimeline: z.array(z.object({
    timestamp: number(),
    eventType: z.string(),
    description: z.string(),
  })).describe("A timeline of key engagement moments."),
  platforms: z.array(z.string()).describe("The social media platforms to target."),
  brandTone: z.enum(['Professional', 'Bold', 'Casual', 'Humorous']).describe("The desired tone for the generated content."),
});
export type AiViralContentInput = z.infer<typeof AiViralContentInputSchema>;

export const AiViralContentOutputSchema = z.object({
  extractedClips: z.array(z.object({
    clipCategory: z.enum(['Insight', 'Opinion', 'Story', 'Quote']).describe("The category of the extracted clip."),
    description: z.string().describe("A summary of what the clip is about."),
    timestamp: z.number().describe("The start time of the clip in seconds."),
    transcriptSnippet: z.string().describe("The relevant snippet of the transcript for this clip."),
  })).describe("A list of smart clips extracted from the podcast, chosen from emotional and authority peaks."),

  instagram: z.object({
    reelScripts: z.array(z.string()).describe("Three short, engaging Reel scripts based on the best clips."),
    hookVariations: z.array(z.string()).describe("Five hook variations to capture attention immediately."),
    captionVariations: z.array(z.string()).describe("Three caption variations for the posts."),
    hashtags: z.array(z.string()).describe("Ten optimized hashtags, including India-aware tags if relevant."),
    simulatedReactions: z.array(z.string()).describe("A list of simulated reactions from the target audience."),
  }).optional(),

  linkedin: z.object({
    authorityPost: z.string().describe("A post framed to establish authority, based on a key insight from the podcast."),
    storytellingPost: z.string().describe("A post that uses a narrative or story from the podcast to engage the audience."),
    simulatedReactions: z.array(z.string()).describe("A list of simulated reactions from the target audience."),
  }).optional(),

  twitter: z.object({
    tweetThread: z.string().describe("A 5-tweet thread expanding on a core idea from the podcast."),
    quoteTweet: z.string().describe("A concise, impactful quote from the podcast, ready to be posted as a quote-style image or text."),
    simulatedReactions: z.array(z.string()).describe("A list of simulated reactions from the target audience."),
  }).optional(),

  youtube: z.object({
    shortScripts: z.array(z.string()).describe("Two scripts for short-form videos, optimized for YouTube Shorts."),
    titleIdeas: z.array(z.string()).describe("Three optimized title ideas for the shorts."),
    simulatedReactions: z.array(z.string()).describe("A list of simulated reactions from the target audience."),
  }).optional(),
});
export type AiViralContentOutput = z.infer<typeof AiViralContentOutputSchema>;

// Mocking the function since the work is now done by Cohere in /api/authority-engine
export async function generateViralContent(input: AiViralContentInput): Promise<AiViralContentOutput> {
  throw new Error("Use /api/authority-engine instead of this flow.");
}

// Helper to make the schema above work (z.number() instead of number())
function number() { return z.number(); }
