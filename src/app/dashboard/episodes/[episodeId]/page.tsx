'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { EpisodesContext } from '@/context/episodes-context';
import type { Episode, PodScoreDimension } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Target,
  BarChart,
  BrainCircuit,
  ThumbsUp,
  FileText,
  Clock,
  Speaker,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

function ScoreCard({ title, score, explanation, icon: Icon }: { title: string; score: number; explanation: string; icon: React.ElementType }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Icon className="size-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow space-y-4">
        <div className="relative">
          <Progress value={score * 10} className="h-3" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm text-primary-foreground">{score}/10</span>
        </div>
        <p className="text-muted-foreground text-sm flex-grow"><Balancer>{explanation}</Balancer></p>
      </CardContent>
    </Card>
  );
}

function OverallScore({ score, explanation }: { score: number, explanation: string }) {
    const getScoreColor = () => {
        if (score > 80) return "text-green-400";
        if (score > 60) return "text-yellow-400";
        return "text-red-400";
    }

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
                <CardDescription>Overall PodScore</CardDescription>
                <CardTitle className={`font-headline text-7xl ${getScoreColor()}`}>
                    {score}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground"><Balancer>{explanation}</Balancer></p>
            </CardContent>
        </Card>
    )
}

export default function EpisodeDetailPage() {
  const { getEpisodeById } = useContext(EpisodesContext);
  const params = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (params.episodeId) {
      const foundEpisode = getEpisodeById(params.episodeId as string);
      setEpisode(foundEpisode);
    }
  }, [params.episodeId, getEpisodeById]);

  if (!episode) {
    return (
      <div className="flex items-center justify-center h-96">
        <Bot className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Episode Analysis...</p>
      </div>
    );
  }

  if (episode.status !== 'processed' || !episode.analysis) {
    return (
      <div className="flex items-center justify-center h-96">
        <Bot className="w-12 h-12 animate-pulse text-primary" />
        <p className="ml-4 text-lg">Analyzing your episode... Hang tight!</p>
      </div>
    );
  }
  
  const { podScore, engagementTimeline, improvementIntelligence, cleanTranscript } = episode.analysis;
  
  const scoreDimensions = [
      { id: 'questionQuality', title: 'Question Quality', icon: BrainCircuit },
      { id: 'domainDepth', title: 'Domain Depth', icon: Target },
      { id: 'keywordRelevance', title: 'Keyword Relevance', icon: Sparkles },
      { id: 'emotionalEngagement', title: 'Emotional Engagement', icon: ThumbsUp },
      { id: 'voiceTone', title: 'Voice Tone & Energy', icon: BarChart },
      { id: 'clarity', title: 'Clarity vs Rambling', icon: CheckCircle2 },
  ] as const;

  return (
    <div className="space-y-8">
      <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{episode.title}</CardTitle>
          <CardDescription>
            Here is the detailed engagement analysis and PodScore for your episode.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <OverallScore score={podScore.overall.score} explanation={podScore.overall.explanation} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoreDimensions.map(dim => (
              <ScoreCard
                  key={dim.id}
                  title={dim.title}
                  icon={dim.icon}
                  score={podScore[dim.id].score}
                  explanation={podScore[dim.id].explanation}
              />
          ))}
        </div>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles /> Improvement Intelligence</CardTitle>
          <CardDescription>Actionable suggestions to make your next episode even better.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {improvementIntelligence.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="size-4 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">{suggestion}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText /> Clean Transcript</CardTitle>
             <CardDescription>A structured, speaker-separated transcript of your episode.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {cleanTranscript.map((line, i) => (
              <div key={i} className="flex gap-3">
                <div className="font-semibold text-primary w-24 flex-shrink-0 flex items-center gap-2"><Speaker className="size-4"/>{line.speaker}</div>
                <p className="text-muted-foreground">{line.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock /> Engagement Timeline</CardTitle>
                <CardDescription>Key moments of high engagement from your episode.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {engagementTimeline.map((item, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-3">
                            <div className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                                {new Date(item.timestamp * 1000).toISOString().substr(14, 5)}
                            </div>
                            <Badge variant="secondary">{item.eventType}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 pl-3 border-l-2 border-border ml-3">{item.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
