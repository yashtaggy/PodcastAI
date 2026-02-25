'use server';
/**
 * @fileOverview A Genkit flow for generating a podcast launch strategy based on user onboarding data.
 *
 * - generateLaunchStrategy - A function that orchestrates the AI generation of a launch strategy.
 * - AiLaunchStrategyInput - The input type for the generateLaunchStrategy function.
 * - AiLaunchStrategyOutput - The return type for the generateLaunchStrategy function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiLaunchStrategyInputSchema = z.object({
  podcastNiche: z.string().describe('The niche or category of the podcast.'),
  targetAudience: z.string().describe('A description of the target audience.'),
  languages: z.array(z.string()).describe('List of preferred languages for the content.'),
  tone: z.enum(['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational']).describe('The desired tone of the podcast.'),
  platformPriority: z.array(z.enum(['Instagram', 'LinkedIn', 'YouTube', 'Twitter'])).describe('The social media platforms to prioritize.'),
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
});
export type AiLaunchStrategyOutput = z.infer<typeof AiLaunchStrategyOutputSchema>;


const launchStrategyPrompt = ai.definePrompt({
    name: 'launchStrategyPrompt',
    input: { schema: AiLaunchStrategyInputSchema },
    output: { schema: AiLaunchStrategyOutputSchema },
    prompt: (input) => `You are a world-class podcast launch strategist. Based on the following user preferences, generate a comprehensive launch strategy.

    User Preferences:
    - Podcast Niche: ${input.podcastNiche}
    - Target Audience: ${input.targetAudience}
    - Languages: ${JSON.stringify(input.languages)}
    - Tone: ${input.tone}
    - Platform Priority: ${JSON.stringify(input.platformPriority)}
    - Brand Colors: Primary: ${input.brandColors.primary}, Accent: ${input.brandColors.accent}

    Generate the following strategy components:
    1.  **Podcast Format**: Recommend the best format (e.g., Interview, Solo, Panel).
    2.  **Ideal Episode Structure**: Outline a structure with an intro, distinct segments, and an outro.
    3.  **30-Day Content Plan**: Provide a high-level 30-day content calendar. Include at least 10 content ideas spread across the prioritized platforms. For each, specify the day, the content idea, and the target platform.
    4.  **Guest Recommendations**: List 5 specific and relevant potential guests (can be archetypes or real people).
    5.  **Episode Themes**: Suggest 5 compelling episode themes.
    
    If the selected languages include Indian languages, provide some India-specific insights or content angles where applicable. Tailor recommendations to the specified tone and target audience.

    Provide the output in the specified JSON format.
    `,
});

const aiLaunchStrategyFlow = ai.defineFlow(
  {
    name: 'aiLaunchStrategyFlow',
    inputSchema: AiLaunchStrategyInputSchema,
    outputSchema: AiLaunchStrategyOutputSchema,
  },
  async (input) => {
    const { output } = await launchStrategyPrompt(input);
    if (!output) {
      throw new Error('Failed to generate launch strategy.');
    }
    return output;
  }
);

export async function generateLaunchStrategy(input: AiLaunchStrategyInput): Promise<AiLaunchStrategyOutput> {
  return aiLaunchStrategyFlow(input);
}
