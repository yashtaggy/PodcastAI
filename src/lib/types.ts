import type { AiSocialMediaGeneratorOutput } from '@/ai/flows/ai-social-media-generator-flow';
import type { AiEngagementScorerOutput } from '@/ai/flows/ai-engagement-scorer-flow';
import type { AiAudioCleanerOutput } from '@/ai/flows/ai-audio-cleaner-flow';

export type EpisodeStatus = 'processing' | 'completed' | 'failed' | 'draft';

export type Episode = {
  id: string;
  title: string;
  uploadDate: string;
  duration: string; // "mm:ss"
  status: EpisodeStatus;
  imageUrl: string;
  imageHint: string;
  audioUrl?: string;
  processingResult?: AiAudioCleanerOutput;
  podScore?: AiEngagementScorerOutput;
  contentAssets?: AiSocialMediaGeneratorOutput;
};

export type AnalyticsData = {
  averagePodScore: number;
  averageViralScore: number;
  totalEpisodes: number;
  totalGeneratedPosts: number;
  podScoreTrend: { month: string; score: number }[];
  viralScoreTrend: { month: string; score: number }[];
  platformDistribution: { platform: string; count: number, fill: string }[];
};
