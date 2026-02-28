// 🔥 Remove old AI flow imports completely
// We no longer depend on flow-level types here

export interface PodScoreCategory {
  score: number;
  explanation: string;
}

export interface AiPodScoreOutput {
  podScore: {
    overall: PodScoreCategory;
    questionQuality: PodScoreCategory;
    domainDepth: PodScoreCategory;
    keywordRelevance: PodScoreCategory;
    emotionalEngagement: PodScoreCategory;
    voiceTone: PodScoreCategory;
    clarity: PodScoreCategory;
  };

  improvementIntelligence: string[];

  engagementTimeline: {
    timestamp: number;
    eventType: string;
    description: string;
  }[];

  cleanTranscript: {
    speaker: string;
    text: string;
  }[];
}

export interface NewEpisode {
  title: string;
  description: string;
  transcript: string;
  analysis: AiPodScoreOutput;
}

export interface Episode extends NewEpisode {
  id: string;
  status: 'processing' | 'processed' | 'failed';
  uploadedAt: string;
}