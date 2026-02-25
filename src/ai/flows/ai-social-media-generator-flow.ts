'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating diverse social media content
 * from engaging parts of a podcast episode, including captions, hashtags, and short video scripts.
 *
 * - generateSocialMediaContent - A function that orchestrates the social media content generation.
 * - AiSocialMediaGeneratorInput - The input type for the generateSocialMediaContent function.
 * - AiSocialMediaGeneratorOutput - The return type for the generateSocialMediaContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HighMomentSchema = z.object({
  timestamp: z.string().describe('The timestamp of the high-engagement moment (e.g., "00:01:23").'),
  emotion: z.string().describe('The dominant emotion detected during this moment.'),
  score: z.number().describe('An engagement score for this moment.'),
  viralPotential: z.number().describe('A score indicating the viral potential of this moment.'),
  text: z.string().describe('The transcript text of the high-engagement moment.'),
});

const InstagramContentSchema = z.object({
  reelScripts: z.array(z.string()).length(3).describe('Three short scripts for Instagram Reels.'),
  hooks: z.array(z.string()).length(5).describe('Five engaging hooks for Instagram posts.'),
  hashtags: z.array(z.string()).length(10).describe('Ten relevant hashtags for Instagram.'),
  captions: z.array(z.string()).length(3).describe('Three compelling captions for Instagram posts.'),
});

const LinkedInContentSchema = z.object({
  authorityPost: z.string().describe('A long-form, authoritative post for LinkedIn.'),
  storyPost: z.string().describe('A shorter, engaging story post for LinkedIn.'),
});

const TwitterContentSchema = z.object({
  tweetThread: z.array(z.string()).length(5).describe('A five-tweet thread.'),
});

const YouTubeShortsContentSchema = z.object({
  shortScripts: z.array(z.string()).length(2).describe('Two short video scripts for YouTube Shorts.'),
});

const PostingSuggestionsSchema = z.object({
  bestDay: z.string().describe('Suggested best day of the week to post.'),
  bestTime: z.string().describe('Suggested best time of day to post.'),
});

export const AiSocialMediaGeneratorInputSchema = z.object({
  podcastTitle: z.string().describe('The title of the podcast.'),
  episodeTitle: z.string().describe('The title of the episode.'),
  podcastNiche: z.string().describe('The niche or category of the podcast.'),
  targetAudience: z.string().describe('The target audience for the podcast.'),
  highMoments: z.array(HighMomentSchema).min(1).describe('An array of high-engagement moments from the podcast episode.'),
});

export type AiSocialMediaGeneratorInput = z.infer<typeof AiSocialMediaGeneratorInputSchema>;

export const AiSocialMediaGeneratorOutputSchema = z.object({
  platformContent: z.object({
    instagram: InstagramContentSchema,
    linkedin: LinkedInContentSchema,
    twitter: TwitterContentSchema,
    youtubeShorts: YouTubeShortsContentSchema,
  }),
  postingSuggestions: PostingSuggestionsSchema,
});

export type AiSocialMediaGeneratorOutput = z.infer<typeof AiSocialMediaGeneratorOutputSchema>;

const generateSocialMediaContentPrompt = ai.definePrompt({
  name: 'generateSocialMediaContentPrompt',
  input: { schema: AiSocialMediaGeneratorInputSchema },
  output: { schema: AiSocialMediaGeneratorOutputSchema },
  prompt: `You are an expert social media content creator specializing in podcast promotion. Your goal is to generate viral content for various platforms based on high-engagement moments from a podcast episode.

Podcast Title: {{{podcastTitle}}}
Episode Title: {{{episodeTitle}}}
Podcast Niche: {{{podcastNiche}}}
Target Audience: {{{targetAudience}}}

Here are the high-engagement moments identified from the episode. Focus on the 'text' of these moments, and consider their 'emotion' and 'viralPotential' to craft highly engaging content.

{{#each highMoments}}
Timestamp: {{{timestamp}}}
Emotion: {{{emotion}}}
Viral Potential: {{{viralPotential}}}
Text: {{{text}}}
---
{{/each}}

Generate the following content, ensuring it is tailored to each platform's best practices and optimized for virality and engagement:

Instagram:
- 3 Reel Scripts (short, punchy, visual)
- 5 Engaging Hooks (for posts/reels)
- 10 Relevant Hashtags (mix of popular and niche)
- 3 Compelling Captions (varying lengths, call-to-actions)

LinkedIn:
- 1 Authority Post (professional, insightful, longer form)
- 1 Story Post (personal, engaging, shorter form)

Twitter:
- 1 Five-Tweet Thread (concise, value-driven, each tweet building on the last)

YouTube Shorts:
- 2 Short Scripts (fast-paced, attention-grabbing, suitable for vertical video)

Finally, provide general posting suggestions for the best day and time to reach the target audience.

Ensure all output adheres strictly to the provided JSON schema.`,
});

const aiSocialMediaGeneratorFlow = ai.defineFlow(
  {
    name: 'aiSocialMediaGeneratorFlow',
    inputSchema: AiSocialMediaGeneratorInputSchema,
    outputSchema: AiSocialMediaGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await generateSocialMediaContentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate social media content.');
    }
    return output;
  }
);

export async function generateSocialMediaContent(
  input: AiSocialMediaGeneratorInput
): Promise<AiSocialMediaGeneratorOutput> {
  return aiSocialMediaGeneratorFlow(input);
}
