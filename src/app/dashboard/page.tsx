'use client';
import { useContext, useState } from 'react';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadEpisodeDialog } from '@/components/upload-episode-dialog';
import { EpisodesContext } from '@/context/episodes-context';
import { Rocket, PlusCircle, Podcast, Clock, Bot } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
  const { episodes } = useContext(EpisodesContext);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const testAI = async () => {
    const res = await fetch("/api/test-bedrock");
    const data = await res.json();

    if (data.results?.[0]?.outputText) {
      setAiResponse(data.results[0].outputText);
    } else {
      setAiResponse("Error calling Bedrock.");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline">Episodes</h1>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={testAI}>
            Test AWS Titan
          </Button>

          <UploadEpisodeDialog>
            <Button>
              <PlusCircle className="mr-2" />
              Upload Episode
            </Button>
          </UploadEpisodeDialog>
        </div>
      </div>

      {aiResponse && (
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle>Titan Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{aiResponse}</p>
          </CardContent>
        </Card>
      )}

      {episodes.length === 0 ? (
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 15rem)' }}>
          <Card className="bg-card/70 backdrop-blur-lg border border-border/50 text-center max-w-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl mt-4">
                Welcome to PodCastAI
              </CardTitle>
              <CardDescription className="text-base">
                Let's get started by uploading your first episode.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadEpisodeDialog>
                <Button size="lg">
                  Upload Your First Episode
                </Button>
              </UploadEpisodeDialog>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map(episode => (
            <Link href={`/dashboard/episodes/${episode.id}`} key={episode.id}>
              <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className='flex justify-between items-start'>
                    <CardTitle className="font-semibold text-lg line-clamp-2">
                      {episode.title}
                    </CardTitle>

                    {episode.status === 'processed' && episode.analysis ? (
                      <div className="font-bold text-lg text-green-400 flex items-center gap-1">
                        {episode.analysis.podScore.overall.score}
                        <span className='text-xs text-muted-foreground'>/100</span>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {episode.status === 'processing' ?
                          <Bot className="mr-2 animate-spin" /> :
                          <Clock className="mr-2" />
                        }
                        {episode.status}
                      </Badge>
                    )}
                  </div>

                  <CardDescription>
                    Uploaded {formatDistanceToNow(new Date(episode.uploadedAt), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {episode.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}