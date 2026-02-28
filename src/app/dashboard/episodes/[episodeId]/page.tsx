'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { EpisodesContext } from '@/context/episodes-context';
import type { Episode } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronLeft,
  Flame,
  Brain,
  Target,
  Sparkles,
  ThumbsUp,
  Mic,
  CheckCircle2,
  Lightbulb,
  Clock,
  FileText
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ScoreCard({
  title,
  score,
  explanation,
  icon: Icon,
}: {
  title: string;
  score: number;
  explanation: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Icon className="size-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={score} className="h-2" />
        <p className="font-bold text-primary">{score}/100</p>
        <p className="text-sm text-muted-foreground">
          <Balancer>{explanation}</Balancer>
        </p>
      </CardContent>
    </Card>
  );
}

function OverallScore({
  score,
  explanation,
}: {
  score: number;
  explanation: string;
}) {
  const getColor = () => {
    if (score > 80) return 'text-green-400';
    if (score > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-primary/5 border-primary/20 text-center">
      <CardHeader>
        <CardDescription>Overall PodScore</CardDescription>
        <CardTitle className={`text-7xl font-headline ${getColor()}`}>
          {score}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          <Balancer>{explanation}</Balancer>
        </p>
      </CardContent>
    </Card>
  );
}

export default function EpisodeDetailPage() {
  const router = useRouter();
  const { getEpisodeById } = useContext(EpisodesContext);
  const params = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (params.episodeId) {
      const foundEpisode = getEpisodeById(params.episodeId as string);
      setEpisode(foundEpisode || null);
    }
  }, [params.episodeId, getEpisodeById]);

  if (!episode) {
    return <div className="h-96 flex items-center justify-center">Loading...</div>;
  }

  if (!episode.analysis) {
    return <div className="h-96 flex items-center justify-center">No analysis available.</div>;
  }

  const { podScore, improvementIntelligence, engagementTimeline, cleanTranscript } = episode.analysis;

  return (
    <div className="space-y-10">

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">
              {episode.title}
            </CardTitle>
            <CardDescription>
              Advanced AI podcast intelligence report.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* PODSCORE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame /> PodScore Analysis
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <OverallScore
            score={podScore.overall.score}
            explanation={podScore.overall.explanation}
          />

          <ScoreCard
            title="Question Quality"
            score={podScore.questionQuality.score}
            explanation={podScore.questionQuality.explanation}
            icon={Brain}
          />

          <ScoreCard
            title="Domain Depth"
            score={podScore.domainDepth.score}
            explanation={podScore.domainDepth.explanation}
            icon={Target}
          />

          <ScoreCard
            title="Keyword Relevance"
            score={podScore.keywordRelevance.score}
            explanation={podScore.keywordRelevance.explanation}
            icon={Sparkles}
          />

          <ScoreCard
            title="Emotional Engagement"
            score={podScore.emotionalEngagement.score}
            explanation={podScore.emotionalEngagement.explanation}
            icon={ThumbsUp}
          />

          <ScoreCard
            title="Voice Tone"
            score={podScore.voiceTone.score}
            explanation={podScore.voiceTone.explanation}
            icon={Mic}
          />

          <ScoreCard
            title="Clarity"
            score={podScore.clarity.score}
            explanation={podScore.clarity.explanation}
            icon={CheckCircle2}
          />
        </CardContent>
      </Card>

      {/* IMPROVEMENT INTELLIGENCE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb /> Improvement Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {improvementIntelligence.map((tip, i) => (
              <li key={i} className="text-muted-foreground">
                • {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ENGAGEMENT TIMELINE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock /> Engagement Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {engagementTimeline.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-3">
                <Badge>{item.eventType}</Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.floor(item.timestamp / 60)}:
                  {(item.timestamp % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <p className="text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CLEAN TRANSCRIPT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText /> Clean Transcript
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cleanTranscript.map((line, i) => (
            <div key={i}>
              <p className="font-semibold text-primary">{line.speaker}</p>
              <p className="text-muted-foreground">{line.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}