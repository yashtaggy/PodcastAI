'use client';

import { createContext, useState, useCallback } from 'react';
import type { Episode, NewEpisode, AiPodScoreOutput, AiViralContentOutput } from '@/lib/types';
import { generatePodScore } from '@/ai/flows/ai-podscore-flow';
import { generateViralContent } from '@/ai/flows/ai-viral-content-flow';
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

const DEMO_VIRAL_CONTENT: AiViralContentOutput = {
    extractedClips: [
        { clipCategory: 'Story', description: "The painter's block story illustrates how removing pressure can unlock creativity.", timestamp: 480, transcriptSnippet: "I once worked with a painter who was completely blocked. We set a rule: he had to ruin one canvas every single day..." },
        { clipCategory: 'Insight', description: "Creativity is a muscle, a process of disciplined exploration, not a rare gift.", timestamp: 120, transcriptSnippet: "My research shows the opposite. Creativity is a process of disciplined exploration, of consistently showing up..." },
        { clipCategory: 'Quote', description: "A simple, actionable step to start building creative muscle: the '10-minute curiosity'.", timestamp: 620, transcriptSnippet: "I call it the '10-minute curiosity'. Set a timer for just 10 minutes and ask 'What if?'" }
    ],
    instagram: {
        reelScripts: ["Visual: A sped-up video of a canvas being 'ruined' with paint, then transforming into something beautiful. Text Overlay: 'Feeling creatively blocked? Try this counter-intuitive trick.' (shows speaker snippet) 'The surprising path to your best work.'"],
        hookVariations: ["Your 'bad' ideas are your biggest asset.", "Stop trying to be perfect.", "The #1 creativity killer (and how to beat it).", "What if the secret to creating is... destroying?", "This 10-minute trick unlocks your inner genius."],
        captionVariations: ["Permission to be imperfect. That's the key Dr. Lena Petrova shared on our latest episode. We often wait for a 'perfect' idea, but true creativity is found in the process, in the exploration, even in the mistakes. #CreativeProcess #ArtistBlock #Motivation"],
        hashtags: ["#Creativity", "#Innovation", "#ArtistOnInstagram", "#WriterBlock", "#CreativeCoach", "#Mindset", "#Inspiration", "#PodcastClip", "#SelfGrowth", "#MotivationMonday"]
    },
    linkedin: {
        authorityPost: "In a world obsessed with flawless execution, the most valuable professional skill might just be the courage to be imperfect.\n\nOn the latest Creative Minds episode, Dr. Lena Petrova broke down the myth of the 'lone genius.' Her research indicates that breakthrough creativity isn't about waiting for a lightning strike of inspiration; it's about building a system of 'disciplined exploration.'\n\nBy creating a structure where experimentation is the goal—not perfection—teams can unlock a higher level of innovation. The pressure to be right stifles new ideas. The freedom to be 'wrong' is what allows for true discovery.\n\nThis is a critical lesson for leaders aiming to foster a culture of innovation. Are you creating containers for safe exploration, or just demanding perfect outcomes?\n\n#Innovation #Leadership #BusinessStrategy #Creativity #CorporateCulture",
        storytellingPost: "One of my recent podcast guests told me about a painter who was completely blocked. The solution? He was instructed to 'ruin' one canvas, every single day.\n\nAn odd prescription, but the result was fascinating. Within a week, by removing the pressure of creating a 'masterpiece,' the painter began producing his most exciting work.\n\nIt's a powerful reminder that high-stakes pressure can be the enemy of innovation. When we give ourselves and our teams the freedom to explore, experiment, and even fail, we create the psychological safety needed for breakthrough ideas to emerge.\n\nWhat's one 'canvas' you can afford to 'ruin' this week for the sake of exploration?\n\n#Creativity #Storytelling #ProfessionalDevelopment #Mindset"
    },
    twitter: {
        tweetThread: "1/5 The biggest myth about creativity? That it's a gift for a select few.\n\nI spoke with creativity coach Dr. Lena Petrova, and she argues it's a muscle we can all build. Here's how: 🧵\n\n2/5 It's not about waiting for inspiration. It's about 'Disciplined Exploration.'\n\nYou create a structure (e.g., 30 mins/day) where you're free to explore, experiment, and be imperfect. The structure provides safety for your brain to play.\n\n3/5 A painter client of hers was blocked. The fix? He had to 'ruin' one canvas every day. By removing the pressure of perfection, he unlocked his most creative work.\n\nWhat if you gave yourself permission to create something 'bad'?\n\n4/5 Actionable tip: The '10-Minute Curiosity.'\n\nSet a timer for 10 mins and just ask 'What if...?'\n- What if I wrote this from another POV?\n- What if I used only one color?\nThe goal is curiosity, not a finished product.\n\n5/5 Creativity isn't a magical event. It's a process. Show up. Create a container. Give yourself permission to be imperfect. \n\nWhat are your techniques for staying creative? #CreativeProcess #WriterLife",
        quoteTweet: "The blank page asks for perfection. A container just asks for participation."
    },
    youtubeShorts: {
        shortScripts: ["(Video opens with frustrated person staring at a blank laptop screen). Narrator: Feeling stuck? You're thinking about it all wrong. (Quote from podcast appears on screen). Expert Clip: 'Creativity is a process of disciplined exploration...' Narrator: The secret isn't waiting for the perfect idea. It's giving yourself 10 minutes a day to explore a 'bad' one. Try it."],
        titleIdeas: ["Unlock Your Creativity in 10 Minutes", "The #1 Myth About Creativity", "How To Beat Creative Block FOREVER"]
    }
};


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
            ],
            viralContent: DEMO_VIRAL_CONTENT
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

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        // Step 1: Generate PodScore
        const podScoreResult = await generatePodScore({ transcript: DEMO_TRANSCRIPT, topic: newEpisode.title });

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Step 2: Generate Viral Content
        const viralContentResult = await generateViralContent({
            podcastTopic: newEpisode.title,
            cleanTranscript: podScoreResult.cleanTranscript,
            engagementTimeline: podScoreResult.engagementTimeline,
            platforms: ['instagram', 'linkedin', 'twitter', 'youtube'], // Default platforms
            brandTone: 'Casual', // Default tone
        });

        // Step 3: Combine results and update state
        const processedEpisode: Episode = {
            ...processingEpisode,
            status: 'processed',
            analysis: {
                ...podScoreResult,
                viralContent: viralContentResult,
            },
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
