'use client';

import { createContext, useState, useCallback } from 'react';
import type { Episode, NewEpisode, AiPodScoreOutput } from '@/lib/types';
import { generatePodScore } from '@/ai/flows/ai-podscore-flow';
import { DEMO_TRANSCRIPT } from '@/lib/demo-data';

interface EpisodesContextType {
  episodes: Episode[];
  addEpisode: (newEpisode: NewEpisode) => Promise<void>;
  getEpisodeById: (id: string) => Episode | undefined;
}

export const EpisodesContext = createContext<EpisodesContextType>({
  episodes: [],
  addEpisode: async () => {},
  getEpisodeById: () => undefined,
});

const DEMO_EPISODES: Episode[] = [
    {
        id: '1',
        title: 'The Future of Renewable Energy',
        description: 'An in-depth discussion about the future of solar, wind, and other renewable energy sources with Dr. Evelyn Reed.',
        fileName: 'podcast_energy.mp3',
        status: 'processed',
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        analysis: {
            podScore: {
                questionQuality: { score: 8, explanation: "Host asked insightful, open-ended questions that prompted deep responses from the guest." },
                domainDepth: { score: 9, explanation: "The guest, a clear expert, provided detailed and nuanced information about renewable energy technologies." },
                keywordRelevance: { score: 8, explanation: "Consistently hit relevant keywords like 'solar panels', 'wind turbines', and 'grid modernization'." },
                emotionalEngagement: { score: 7, explanation: "Strong engagement during the discussion on policy changes, showing passion and conviction." },
                voiceTone: { score: 8, explanation: "Both host and guest had clear, varied tones that kept the conversation engaging." },
                clarity: { score: 7, explanation: "Mostly clear, with some minor technical jargon that could be simplified for a broader audience." },
                overall: { score: 82, explanation: "A high-quality, informative episode with strong expert insights and good engagement." }
            },
            engagementTimeline: [
                { timestamp: 305, eventType: 'Storytelling Moment', description: "Guest tells a compelling story about the early days of solar panel adoption." },
                { timestamp: 710, eventType: 'Strong Opinion', description: "Host and guest have a spirited debate about the role of nuclear energy." },
                { timestamp: 1250, eventType: 'Inspiration', description: "Guest provides an inspirational closing thought on how individuals can contribute." }
            ],
            improvementIntelligence: [
                "Consider defining technical terms like 'inverter' or 'utility-scale' for listeners new to the topic.",
                "The audio quality has some slight background hiss around the 15-minute mark; consider using a noise reduction filter in post-production.",
                "Follow up on the guest's mention of 'geothermal energy' as it seemed like a missed opportunity for a deeper dive."
            ],
            cleanTranscript: [
                { speaker: "Speaker 1", text: "Welcome back to 'Future Forward'. Today, we're honored to have Dr. Evelyn Reed, a pioneer in renewable energy." },
                { speaker: "Speaker 2", text: "Thanks for having me. It's a critical time to be discussing this." }
            ]
        }
    }
]


export function EpisodesProvider({ children }: { children: React.ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>(DEMO_EPISODES);

  const addEpisode = useCallback(async (newEpisode: NewEpisode) => {
    const newId = (episodes.length + 2).toString();
    
    // 1. Add to state as "processing"
    const processingEpisode: Episode = {
      id: newId,
      ...newEpisode,
      status: 'processing',
      uploadedAt: new Date().toISOString(),
    };
    setEpisodes(prev => [processingEpisode, ...prev]);

    // 2. Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 3. Call the actual Genkit flow
    try {
        const analysisResult = await generatePodScore({ transcript: DEMO_TRANSCRIPT });

        // 4. Update episode with "processed" status and results
        const processedEpisode: Episode = {
            ...processingEpisode,
            status: 'processed',
            analysis: analysisResult,
        };
        setEpisodes(prev => prev.map(ep => (ep.id === newId ? processedEpisode : ep)));

    } catch (error) {
        console.error("Failed to generate PodScore:", error);
        // 5. Update episode status to "failed" if AI call fails
        const failedEpisode: Episode = {
            ...processingEpisode,
            status: 'failed',
        };
        setEpisodes(prev => prev.map(ep => (ep.id === newId ? failedEpisode : ep)));
    }
  }, [episodes.length]);

  const getEpisodeById = useCallback(
    (id: string) => {
      return episodes.find(ep => ep.id === id);
    },
    [episodes]
  );

  return (
    <EpisodesContext.Provider value={{ episodes, addEpisode, getEpisodeById }}>
      {children}
    </EpisodesContext.Provider>
  );
}
