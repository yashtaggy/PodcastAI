
'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { EpisodesContext } from '@/context/episodes-context';
import type { Episode } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Target,
  BarChart,
  BrainCircuit,
  ThumbsUp,
  FileText,
  Clock,
  Speaker,
  Lightbulb,
  Flame,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

function ScoreCard({ title, score, explanation, icon: Icon }: { title: string; score: number; explanation: string; icon: React.ElementType }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Icon className="size-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow space-y-4">
        <div className="relative">
          <Progress value={score * 10} className="h-2" />
           <p className="text-right font-bold text-sm text-primary-foreground mt-1">{score}/10</p>
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
        <Card className="bg-primary/5 border-primary/20 text-center">
            <CardHeader>
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
  const router = useRouter();
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
      <div className="flex flex-col gap-4 items-center justify-center h-96 text-center">
        <div className="flex items-center">
          <Bot className="w-12 h-12 animate-pulse text-primary" />
          <p className="ml-4 text-xl font-semibold">Analyzing your episode...</p>
        </div>
        <Progress value={50} className="w-1/2 mx-auto animate-pulse" />
        <p className="text-muted-foreground">Hang tight! We're transcribing, analyzing engagement, and generating content.</p>
      </div>
    );
  }
  
  const { podScore, engagementTimeline, improvementIntelligence, cleanTranscript } = episode.analysis;
  
  const scoreDimensions = [
      { id: 'questionQuality', title: 'Question Quality', icon: BrainCircuit },
      { id: 'domainDepth', title: 'Domain Depth', icon: Target },
      { id: 'keywordRelevance', title: 'Keyword Relevance', icon: Sparkles },
      { id: 'emotionalEngagement', title: 'Emotional Engagement', icon: ThumbsUp },
      { id: 'voiceTone', title: 'Voice Tone', icon: BarChart },
      { id: 'clarity', title: 'Clarity', icon: CheckCircle2 },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <Card className="w-full bg-card/70 backdrop-blur-lg border border-border/50">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">{episode.title}</CardTitle>
                <CardDescription>
                    Here is the detailed engagement analysis and PodScore for your episode.
                </CardDescription>
            </CardHeader>
        </Card>
      </div>

      {/* PodScore Section */}
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Flame /> PodScore Analysis</CardTitle>
          <CardDescription>Your episode's performance, broken down by key metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
                <OverallScore score={podScore.overall.score} explanation={podScore.overall.explanation} />
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </CardContent>
      </Card>
      
      {/* Improvement & Timeline Section */}
       <div className="grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb /> Improvement Intelligence</CardTitle>
              <CardDescription>Actionable suggestions to make your next episode even better.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {improvementIntelligence.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronLeft className="size-4 text-primary flex-shrink-0 mt-1 rotate-180" />
                    <p className="text-muted-foreground">{suggestion}</p>
                  </li>
                ))}
              </ul>
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
                          <div key={i}>
                              <div className="flex items-center gap-3">
                                  <div className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                                      {new Date(item.timestamp * 1000).toISOString().substr(14, 5)}
                                  </div>
                                  <Badge variant="secondary">{item.eventType}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 pl-3 border-l-2 border-border ml-3">{item.description}</p>
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
      </div>

      {/* Transcript Section */}
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText /> Clean Transcript</CardTitle>
           <CardDescription>A structured, speaker-separated transcript of your episode.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
          {cleanTranscript.map((line, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="font-semibold text-primary w-28 flex-shrink-0 flex items-center gap-2 pt-0.5"><Speaker className="size-4"/>{line.speaker}</div>
              <p className="text-muted-foreground">{line.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
