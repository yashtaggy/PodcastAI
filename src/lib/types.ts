import type { AiLaunchStrategyOutput } from '@/ai/flows/ai-launch-strategy-flow';
import type { AiPodScoreOutput, AiPodScoreInput } from '@/ai/flows/ai-podscore-flow';
import type { AiViralContentOutput, AiViralContentInput } from '@/ai/flows/ai-viral-content-flow';

export type { 
    AiLaunchStrategyOutput, 
    AiPodScoreOutput, 
    AiPodScoreInput,
    AiViralContentOutput,
    AiViralContentInput
};


export type PodScoreDimension = AiPodScoreOutput['podScore']['questionQuality'];

export interface NewEpisode {
  title: string;
  description: string;
  fileName: string;
}

export interface Episode extends NewEpisode {
  id: string;
  status: 'processing' | 'processed' | 'failed';
  uploadedAt: string;
  analysis?: AiPodScoreOutput & {
    viralContent?: AiViralContentOutput;
  };
}
