'use server';
/**
 * @fileOverview A Genkit flow that analyzes podcast episode content to generate engagement metrics.
 *
 * - aiEngagementScorer - A function that orchestrates the AI analysis for engagement and viral scoring.
 * - AiEngagementScorerInput - The input type for the aiEngagementScorer function.
 * - AiEngagementScorerOutput - The return type for the aiEngagementScorer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema for the AI Engagement Scorer
const AiEngagementScorerInputSchema = z.object({
  cleanedTranscript: z
    .string()
    .describe('The cleaned and transcribed text of the podcast episode.'),
  removedSilences: z
    .array(z.object({ start: z.number(), end: z.number() }))
    .describe('Timestamped segments of silence that were removed from the audio.'),
  removedFillers: z
    .array(z.object({ word: z.string(), timestamp: z.number() }))
    .describe('List of filler words removed and their original timestamps.'),
  lowEnergySections: z
    .array(z.object({ start: z.number(), end: z.number() }))
    .describe(
      'Sections of the audio with low energy identified by the auto editing engine.'
    ),
});
export type AiEngagementScorerInput = z.infer<typeof AiEngagementScorerInputSchema>;

// Output Schema for the AI Engagement Scorer
const AiEngagementScorerOutputSchema = z.object({
  podScore: z.object({
    questionQuality: z
      .number()
      .min(1)
      .max(10)
      .describe('Score (1-10) for the quality and relevance of questions asked.'),
    domainExpertise: z
      .number()
      .min(1)
      .max(10)
      .describe('Score (1-10) for the depth and accuracy of domain knowledge displayed.'),
    presentationQuality: z
      .number()
      .min(1)
      .max(10)
      .describe('Score (1-10) for clarity, eloquence, and delivery of content.'),
    engagementStrength: z
      .number()
      .min(1)
      .max(10)
      .describe(
        'Score (1-10) for how well the content holds audience attention and prompts interaction.'
      ),
    overallScore: z
      .number()
      .min(1)
      .max(10)
      .describe('Overall engagement score (1-10) for the episode.'),
  }).describe('Comprehensive engagement scores for various aspects of the podcast episode.'),
  highMoments: z
    .array(
      z.object({
        timestamp: z
          .number()
          .describe('Timestamp in seconds where the high moment occurs.'),
        emotion: z.string().describe('Identified emotion or sentiment during this moment.'),
        score: z
          .number()
          .min(1)
          .max(10)
          .describe('Engagement score (1-10) for this specific high moment.'),
        viralPotential: z
          .number()
          .min(0)
          .max(1)
          .describe(
            'A probability (0-1) indicating the viral potential of this segment.'
          ),
      })
    )
    .describe('Key high-engagement or emotionally significant moments in the episode.'),
  lowEnergySections: z
    .array(z.object({ start: z.number(), end: z.number(), reason: z.string() }))
    .describe(
      'Sections of the episode identified by the AI as having low energy or engagement potential, with a brief reason.'
    ),
  dropPrediction: z
    .string()
    .describe(
      'Analysis and prediction of potential audience drop-off points, including reasons.'
    ),
  viralScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Overall viral potential score (0-100) for the entire episode.'),
});
export type AiEngagementScorerOutput = z.infer<typeof AiEngagementScorerOutputSchema>;

// Wrapper function to call the Genkit flow
export async function aiEngagementScorer(
  input: AiEngagementScorerInput
): Promise<AiEngagementScorerOutput> {
  return aiEngagementScorerFlow(input);
}

// Define the Genkit prompt for AI engagement scoring
const engagementScorerPrompt = ai.definePrompt({
  name: 'engagementScorerPrompt',
  input: { schema: AiEngagementScorerInputSchema },
  output: { schema: AiEngagementScorerOutputSchema },
  prompt: `You are an expert podcast content analyst. Your task is to meticulously evaluate a podcast episode's transcript to determine its engagement, identify key moments, and predict its viral potential.\n\nAnalyze the provided cleaned transcript, considering the context of any previously identified low energy sections, silences, and filler words (though your primary analysis should be on the cleaned transcript content itself).\n\nFocus on the following:\n1.  **PodScore**: Assign scores (1-10) for question quality, domain expertise, presentation quality, and overall engagement strength. Calculate an overall PodScore.\n2.  **High Moments**: Identify up to 5-10 distinct moments in the transcript that stand out due to strong emotion, compelling content, or high engagement potential. For each, provide a timestamp (in seconds, approximate based on content length), the primary emotion/theme, an engagement score (1-10), and a viral probability (0-1).\n3.  **Low Energy Sections**: Re-evaluate or identify sections within the *cleaned transcript* that could lead to decreased listener engagement due to pacing, content, or tone. Provide start and end timestamps (approximate in seconds) and a brief reason.\n4.  **Drop Prediction**: Based on your analysis, predict if and why listeners might drop off, pointing to specific content areas or patterns.\n5.  **Viral Score**: Assign an overall viral potential score (0-100) for the entire episode.\n\nWhen estimating timestamps, assume an an average speaking rate of 150 words per minute for the cleaned transcript. The provided 'removedSilences' and 'removedFillers' information can help contextualize potential pacing issues but do not directly influence your content-based timestamp estimations.\n\nCleaned Transcript:\n{{{cleanedTranscript}}}\n\nPreviously Identified Low Energy Sections (for context):\n{{#if lowEnergySections}}\n{{#each lowEnergySections}}\n- From {{this.start}}s to {{this.end}}s\n{{/each}}\n{{else}}\nNone\n{{/if}}\n\nPreviously Removed Silences (for context):\n{{#if removedSilences}}\n{{#each removedSilences}}\n- From {{this.start}}s to {{this.end}}s\n{{/each}}\n{{else}}\nNone\n{{/if}}\n\nPreviously Removed Filler Words (for context):\n{{#if removedFillers}}\n{{#each removedFillers}}\n- Word: "{{this.word}}" at {{this.timestamp}}s\n{{/each}}\n{{else}}\nNone\n{{/if}}\n\nProvide your analysis in the specified JSON format.\n`,
});

// Define the Genkit flow for AI engagement scoring
const aiEngagementScorerFlow = ai.defineFlow(
  {
    name: 'aiEngagementScorerFlow',
    inputSchema: AiEngagementScorerInputSchema,
    outputSchema: AiEngagementScorerOutputSchema,
  },
  async (input) => {
    const { output } = await engagementScorerPrompt(input);
    return output!;
  }
);
