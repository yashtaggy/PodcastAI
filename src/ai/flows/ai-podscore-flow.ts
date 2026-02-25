'use server';
/**
 * @fileOverview A Genkit flow for analyzing a podcast transcript to generate a PodScore, 
 * engagement timeline, and improvement intelligence.
 *
 * - generatePodScore - A function that orchestrates the AI analysis of a podcast transcript.
 * - AiPodScoreInput - The input type for the generatePodScore function.
 * - AiPodScoreOutput - The return type for the generatePodScore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AiPodScoreInputSchema = z.object({
  transcript: z.string().describe('The full transcript of the podcast episode.'),
  topic: z.string().optional().describe('The intended topic or goal of the episode.'),
});
export type AiPodScoreInput = z.infer<typeof AiPodScoreInputSchema>;

const PodScoreDimensionSchema = z.object({
    score: z.number().min(0).max(10).describe('A score from 0-10 for the dimension.'),
    explanation: z.string().describe('An explanation of why this score was given.')
});

const AiPodScoreOutputSchema = z.object({
  podScore: z.object({
    questionQuality: PodScoreDimensionSchema,
    domainDepth: PodScoreDimensionSchema,
    keywordRelevance: PodScoreDimensionSchema,
    emotionalEngagement: PodScoreDimensionSchema,
    voiceTone: PodScoreDimensionSchema,
    clarity: PodScoreDimensionSchema,
    overall: PodScoreDimensionSchema.extend({
        score: z.number().min(0).max(100).describe('The overall composite score from 0-100.')
    }),
  }).describe('A composite, explainable score across multiple dimensions.'),
  
  engagementTimeline: z.array(z.object({
    timestamp: z.number().describe('The timestamp in seconds where the event occurs.'),
    eventType: z.enum(['Emotional Peak', 'Laughter', 'Inspiration', 'Strong Opinion', 'Storytelling Moment', 'Controversial Moment']).describe('The type of engagement event.'),
    description: z.string().describe('A brief description of the moment.'),
  })).describe('Visual markers of key moments in the podcast timeline.'),

  improvementIntelligence: z.array(z.string()).describe('Actionable, specific suggestions for how to improve the podcast episode.'),

  cleanTranscript: z.array(z.object({
    speaker: z.string().describe('The identified speaker (e.g., Speaker 1, Speaker 2).'),
    text: z.string().describe('The portion of the transcript spoken by this speaker.'),
  })).describe('A clean, structured, and speaker-separated transcript.'),
});
export type AiPodScoreOutput = z.infer<typeof AiPodScoreOutputSchema>;

const podScorePrompt = ai.definePrompt({
    name: 'podScorePrompt',
    input: { schema: AiPodScoreInputSchema },
    output: { schema: AiPodScoreOutputSchema },
    prompt: (input) => `
    You are a world-class podcast analysis engine called PodScore. Your task is to analyze a podcast transcript and provide a detailed, actionable intelligence report.

    **Podcast Transcript:**
    \`\`\`
    ${input.transcript}
    \`\`\`
    
    **Intended Topic (if provided):** ${input.topic || 'Not specified'}

    **Analysis Required:**

    1.  **Generate PodScore:**
        -   Rate the episode on a scale of 0-10 for each dimension: \`questionQuality\`, \`domainDepth\`, \`keywordRelevance\`, \`emotionalEngagement\`, \`voiceTone\`, and \`clarity\`.
        -   For EACH dimension, provide a concise \`explanation\` detailing WHY you gave that score. Be specific and reference parts of the transcript.
        -   Calculate an \`overall\` composite score from 0-100 based on the individual dimensions, and provide an explanation for it.

    2.  **Create Engagement Timeline:**
        -   Identify at least 5-7 key moments in the transcript.
        -   For each moment, provide the \`timestamp\` (estimate seconds based on typical speaking pace of 150 words per minute), \`eventType\` (e.g., 'Emotional Peak', 'Laughter', 'Storytelling Moment'), and a brief \`description\`.

    3.  **Provide Improvement Intelligence:**
        -   Generate a list of 3-5 highly specific, actionable recommendations for improvement. Do not give generic advice.
        -   Examples of good feedback: "At 12:35, you asked three closed questions in a row, which limited the guest's response. Try asking more open-ended questions like 'How did that experience shape your perspective?'.", "The energy drops significantly around the 22-minute mark during the technical explanation. Consider adding a short musical transition or a practical example to re-engage listeners."

    4.  **Generate Clean Transcript:**
        -   Process the raw transcript into a structured format.
        -   Separate the text by speaker (e.g., "Speaker 1", "Speaker 2"). If speakers are not labeled, infer them.

    Produce the output in the specified JSON format.
    `,
});


const aiPodScoreFlow = ai.defineFlow(
  {
    name: 'aiPodScoreFlow',
    inputSchema: AiPodScoreInputSchema,
    outputSchema: AiPodScoreOutputSchema,
  },
  async (input) => {
    // In a real app, you might have a separate, faster model for the clean transcript part.
    // For this simulation, we'll do it all in one prompt.
    const { output } = await podScorePrompt(input);

    if (!output) {
        throw new Error('Failed to generate PodScore analysis.');
    }
    
    return output;
  }
);

export async function generatePodScore(input: AiPodScoreInput): Promise<AiPodScoreOutput> {
  return aiPodScoreFlow(input);
}
