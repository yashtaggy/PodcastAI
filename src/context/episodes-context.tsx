
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
        title: 'The Spark Within: Unlocking Everyday Creativity',
        description: 'A deep dive with renowned author and creativity coach, Dr. Lena Petrova, on how to build your creative muscle.',
        fileName: 'podcast_creativity.mp3',
        status: 'processed',
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        analysis: {
            podScore: {
                questionQuality: { score: 8, explanation: "Host asked insightful, open-ended questions that prompted deep responses from the guest." },
                domainDepth: { score: 9, explanation: "The guest, a clear expert, provided detailed and nuanced information about creative processes." },
                keywordRelevance: { score: 8, explanation: "Consistently hit relevant keywords like 'creativity', 'inspiration', and 'process'." },
                emotionalEngagement: { score: 9, explanation: "The story about the blocked painter was a clear emotional peak, showing strong narrative skill." },
                voiceTone: { score: 8, explanation: "Both host and guest had clear, varied tones that kept the conversation engaging and inspirational." },
                clarity: { score: 9, explanation: "Complex ideas were broken down into simple, actionable steps like the '10-minute curiosity'." },
                overall: { score: 88, explanation: "A high-quality, inspirational episode with strong expert insights and actionable advice." }
            },
            engagementTimeline: [
                { timestamp: 125, eventType: 'Insight', description: "Guest defines creativity as a 'muscle' and a 'process of disciplined exploration'." },
                { timestamp: 480, eventType: 'Storytelling Moment', description: "Guest tells a compelling story about a painter who had to 'ruin' a canvas to overcome his block." },
                { timestamp: 620, eventType: 'Inspiration', description: "Guest provides an actionable '10-minute curiosity' tip for listeners." },
                { timestamp: 245, eventType: 'Strong Opinion', description: "Guest pushes back against the 'myth of the lone genius'." }
            ],
            improvementIntelligence: [
                "The painter story is powerful. Consider turning it into a short audiogram for social media.",
                "The '10-minute curiosity' is a fantastic, actionable takeaway. Feature it in the episode's show notes and as a standalone social post.",
                "The audio is very clean, but adding subtle background music during the intro and outro could elevate the production value."
            ],
            cleanTranscript: [
                { speaker: "Speaker 1", text: "Welcome to the Creative Minds podcast. I'm your host, Alex..." },
                { speaker: "Speaker 2", text: "Thank you for having me, Alex. It's a pleasure to be here." }
            ]
        }
    }
]


export function EpisodesProvider({ children }: { children: React.ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>(DEMO_EPISODES);

  const addEpisode = useCallback(async (newEpisode: NewEpisode) => {
    const newId = (episodes.length + 2).toString();
    
    const processingEpisode: Episode = {
      id: newId,
      ...newEpisode,
      status: 'processing',
      uploadedAt: new Date().toISOString(),
    };
    setEpisodes(prev => [processingEpisode, ...prev]);

    // Simulate backend processing
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        const podScoreResult = await generatePodScore({ transcript: DEMO_TRANSCRIPT, topic: newEpisode.title });

        const processedEpisode: Episode = {
            ...processingEpisode,
            status: 'processed',
            analysis: podScoreResult,
        };
        setEpisodes(prev => prev.map(ep => (ep.id === newId ? processedEpisode : ep)));

    } catch (error) {
        console.error("Failed during AI processing:", error);
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
