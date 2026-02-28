'use client';

import { createContext, useState, useCallback, useEffect } from 'react';
import type { Episode } from '@/lib/types';
import { fetchAuthSession } from 'aws-amplify/auth';

interface EpisodesContextType {
  episodes: Episode[];
  addEpisode: (episode: Omit<Episode, 'id' | 'uploadedAt' | 'status'> & { analysis: any }) => Promise<void>;
  getEpisodeById: (id: string) => Episode | undefined;
}

export const EpisodesContext = createContext<EpisodesContextType>({
  episodes: [],
  addEpisode: async () => {},
  getEpisodeById: () => undefined,
});

export function EpisodesProvider({ children }: { children: React.ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  // 🔥 LOAD EPISODES FROM DYNAMO ON START
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const session = await fetchAuthSession();
        const userId = session.tokens?.idToken?.payload?.sub;

        if (!userId) return;

        const res = await fetch('/api/get-episodes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (data.episodes) {
  const formatted = data.episodes.map((item: any) => ({
    id: item.episodeId,          // 🔥 map properly
    title: item.title,
    description: item.description,
    transcript: item.transcript,
    analysis: item.analysis,
    uploadedAt: item.uploadedAt,
    status: 'processed',
  }));

  setEpisodes(formatted);
}

      } catch (error) {
        console.error('Failed loading episodes:', error);
      }
    };

    loadEpisodes();
  }, []);

  // 🔥 SAVE TO DYNAMO WHEN ADDING
  const addEpisode = useCallback(async (episodeData: any) => {
    try {
      const newId = Date.now().toString();
      const uploadedAt = new Date().toISOString();

      const newEpisode: Episode = {
        id: newId,
        title: episodeData.title,
        description: episodeData.description,
        transcript: episodeData.transcript,
        analysis: episodeData.analysis,
        status: 'processed',
        uploadedAt,
      };

      // 1️⃣ Update UI immediately
      setEpisodes(prev => [newEpisode, ...prev]);

      // 2️⃣ Get Cognito user
      const session = await fetchAuthSession();
      const userId = session.tokens?.idToken?.payload?.sub;

      if (!userId) {
        throw new Error("User ID not found");
      }

      // 3️⃣ Save to DynamoDB
      await fetch('/api/save-episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          episodeId: newId,
          userId,
          title: newEpisode.title,
          description: newEpisode.description,
          transcript: newEpisode.transcript,
          analysis: newEpisode.analysis,
          uploadedAt,
        }),
      });

    } catch (error) {
      console.error("Failed saving episode:", error);
    }
  }, []);

  const getEpisodeById = useCallback(
    (id: string) => episodes.find(ep => ep.id === id),
    [episodes]
  );

  return (
    <EpisodesContext.Provider value={{ episodes, addEpisode, getEpisodeById }}>
      {children}
    </EpisodesContext.Provider>
  );
}