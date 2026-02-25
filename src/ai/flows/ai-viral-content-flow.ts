'use server';
/**
 * @fileOverview A Genkit flow for generating viral social media content from a podcast analysis.
 *
 * - generateViralContent - A function that orchestrates the AI generation of social media content.
 * - AiViralContentInput - The input type for the generateViralContent function.
 * - AiViralContentOutput - The return type for the generateViralContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { AiPodScoreOutput } from '@/lib/types';

const AiViralContentInputSchema = z.object({
    podcastTopic: z.string().describe("The main topic of the podcast episode."),
    cleanTranscript: z.array(z.object({
        speaker: z.string(),
        text: z.string(),
    })).describe("The clean, speaker-separated transcript."),
    engagementTimeline: z.array(z.object({
        timestamp: z.number(),
        eventType: z.string(),
        description: z.string(),
    })).describe("A timeline of key engagement moments."),
    platforms: z.array(z.string()).describe("The social media platforms to target."),
    brandTone: z.enum(['Professional', 'Bold', 'Casual', 'Humorous']).describe("The desired tone for the generated content."),
});
export type AiViralContentInput = z.infer<typeof AiViralContentInputSchema>;

const AiViralContentOutputSchema = z.object({
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
    }).describe("Content package for Instagram."),

    linkedin: z.object({
        authorityPost: z.string().describe("A post framed to establish authority, based on a key insight from the podcast."),
        storytellingPost: z.string().describe("A post that uses a narrative or story from the podcast to engage the audience."),
    }).describe("Content package for LinkedIn."),

    twitter: z.object({
        tweetThread: z.string().describe("A 5-tweet thread expanding on a core idea from the podcast."),
        quoteTweet: z.string().describe("A concise, impactful quote from the podcast, ready to be posted as a quote-style image or text."),
    }).describe("Content package for Twitter/X."),
    
    youtubeShorts: z.object({
        shortScripts: z.array(z.string()).describe("Two scripts for short-form videos, optimized for YouTube Shorts."),
        titleIdeas: z.array(z.string()).describe("Three optimized title ideas for the shorts."),
    }).describe("Content package for YouTube Shorts."),
});
export type AiViralContentOutput = z.infer<typeof AiViralContentOutputSchema>;


const viralContentPrompt = ai.definePrompt({
    name: 'viralContentPrompt',
    input: { schema: AiViralContentInputSchema },
    output: { schema: AiViralContentOutputSchema },
    prompt: (input) => `
    You are a Podcast Authority Engine. Your job is to convert a single podcast episode into weeks of high-visibility social media content, positioning the creator as an expert.

    **Analysis of the Podcast:**
    - **Topic:** ${input.podcastTopic}
    - **Brand Tone:** ${input.brandTone}
    - **Target Platforms:** ${input.platforms.join(', ')}
    - **Key Engagement Moments:**
      ${input.engagementTimeline.map(e => `- At ${Math.floor(e.timestamp / 60)}m${e.timestamp % 60}s: ${e.eventType} - ${e.description}`).join('\n')}
    - **Full Transcript:**
      \`\`\`
      ${input.cleanTranscript.map(t => `${t.speaker}: ${t.text}`).join('\n')}
      \`\`\`

    **Your Task:**
    Based on all the provided information, generate a complete "Platform-Specific Authority Package".

    **1. Smart Clip Extraction:**
    First, identify 3-4 top-tier moments from the transcript. Use the engagement timeline as your guide. For each moment, determine its category ('Insight', 'Opinion', 'Story', 'Quote'), provide a brief description, the timestamp, and the exact transcript snippet. These are your "Extracted Clips".

    **2. Platform-Specific Content Generation:**
    Now, using those extracted clips and the overall transcript, create content for the following platforms if they are listed in the target platforms. Frame everything with authority, aiming to establish the creator as an expert. The tone must be ${input.brandTone}.

    - **Instagram:**
      - Generate 2-3 engaging Reel scripts (15-30 seconds each).
      - Write 5 different, powerful hook variations.
      - Write 3 distinct caption variations.
      - Provide 10 optimized hashtags (be India-aware if the content suggests it).

    - **LinkedIn:**
      - Write one longer "Authority Post" that explains a key insight with a "why this matters" angle.
      - Write one "Storytelling Post" based on a narrative moment from the podcast.

    - **Twitter (X):**
      - Write a compelling 5-tweet thread that breaks down a complex topic from the episode.
      - Extract one powerful, short "Quote Tweet".

    - **YouTube Shorts:**
      - Write two scripts for vertical videos under 60 seconds.
      - Suggest three catchy, SEO-friendly titles for these shorts.

    Produce the output in the specified JSON format.
    `,
});

const aiViralContentFlow = ai.defineFlow(
  {
    name: 'aiViralContentFlow',
    inputSchema: AiViralContentInputSchema,
    outputSchema: AiViralContentOutputSchema,
  },
  async (input) => {
    const { output } = await viralContentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate viral content.');
    }
    return output;
  }
);


export async function generateViralContent(input: AiViralContentInput): Promise<AiViralContentOutput> {
  return aiViralContentFlow(input);
}
