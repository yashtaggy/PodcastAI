import { episodes } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart, Clock, ExternalLink, FileText, Bot, Share2, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { RadialBar, RadialBarChart, PolarGrid } from "recharts";

type PageProps = {
  params: { id: string };
};

export default function EpisodeDetailPage({ params }: PageProps) {
  const episode = episodes.find((ep) => ep.id === params.id);

  if (!episode) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  const podScore = episode.podScore;
  const content = episode.contentAssets;

  const scoreData = podScore ? [
    { name: 'Overall', value: podScore.podScore.overallScore * 10, fill: 'hsl(var(--primary))' },
    { name: 'Viral', value: podScore.viralScore, fill: 'hsl(var(--accent))' },
  ] : [];

  return (
    <div className="space-y-6">
      <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
        <CardHeader className="flex flex-col md:flex-row gap-6">
          <Image
            alt={episode.title}
            className="aspect-video md:aspect-square rounded-lg object-cover md:w-48"
            height={180}
            src={episode.imageUrl}
            width={320}
            data-ai-hint={episode.imageHint}
          />
          <div className="space-y-2">
            <div className="flex items-center gap-4">
               {getStatusBadge(episode.status)}
               <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1.5" />
                {episode.duration}
               </div>
            </div>
            <CardTitle className="font-headline text-3xl">{episode.title}</CardTitle>
            <CardDescription>{episode.uploadDate}</CardDescription>
            <div className="flex gap-2 pt-2">
              <Button><PlayIcon className="mr-2 h-4 w-4" /> Play Audio</Button>
              <Button variant="outline"><ExternalLink className="mr-2 h-4 w-4" /> View Original</Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics"><BarChart className="w-4 h-4 mr-2" />Analytics</TabsTrigger>
          <TabsTrigger value="content"><Bot className="w-4 h-4 mr-2" />Generated Content</TabsTrigger>
          <TabsTrigger value="transcript"><FileText className="w-4 h-4 mr-2" />Transcript</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          {podScore ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card/70 backdrop-blur-lg border border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline">PodScore Breakdown</CardTitle>
                  <CardDescription>Detailed engagement metrics for this episode.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                    <ScoreGauge title="Overall Score" score={podScore.podScore.overallScore} />
                    <ScoreGauge title="Viral Score" score={podScore.viralScore / 10} suffix="%" value={podScore.viralScore}/>
                    <ScoreItem title="Question Quality" score={podScore.podScore.questionQuality} />
                    <ScoreItem title="Domain Expertise" score={podScore.podScore.domainExpertise} />
                    <ScoreItem title="Presentation Quality" score={podScore.podScore.presentationQuality} />
                    <ScoreItem title="Engagement Strength" score={podScore.podScore.engagementStrength} />
                </CardContent>
              </Card>
               <Card className="lg:col-span-1 bg-card/70 backdrop-blur-lg border border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline">High-Engagement Moments</CardTitle>
                  <CardDescription>Top clips with viral potential.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {podScore.highMoments.map((moment, index) => (
                            <div key={index} className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-mono text-primary">@{new Date(moment.timestamp * 1000).toISOString().substr(14, 5)}</span>
                                    <Badge variant="outline" className="border-accent text-accent">{moment.emotion}</Badge>
                                </div>
                                <p className="text-sm text-foreground/80 leading-snug">{moment.text}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <p>Analytics are being generated. Check back soon!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="content" className="mt-6">
            {content ? (
                <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
                    <CardHeader>
                        <CardTitle className="font-headline">AI-Generated Content</CardTitle>
                        <CardDescription>Ready-to-use posts, threads, and scripts for your social media.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="instagram">
                                <AccordionTrigger className="text-lg font-semibold"><Instagram className="mr-2 text-pink-500" />Instagram</AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-2">
                                    <ContentSection title="Reel Scripts" items={content.platformContent.instagram.reelScripts} />
                                    <ContentSection title="Hooks" items={content.platformContent.instagram.hooks} />
                                    <ContentSection title="Captions" items={content.platformContent.instagram.captions} />
                                    <ContentSection title="Hashtags" items={content.platformContent.instagram.hashtags.map(h => ({ content: h, type: 'badge' }))} />
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="twitter">
                                <AccordionTrigger className="text-lg font-semibold"><Twitter className="mr-2 text-sky-500" />Twitter</AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-2">
                                     <ContentSection title="Tweet Thread" items={content.platformContent.twitter.tweetThread} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="linkedin">
                                <AccordionTrigger className="text-lg font-semibold"><Linkedin className="mr-2 text-blue-500" />LinkedIn</AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-2">
                                     <ContentSection title="Authority Post" items={[content.platformContent.linkedin.authorityPost]} />
                                     <ContentSection title="Story Post" items={[content.platformContent.linkedin.storyPost]} />
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="youtube">
                                <AccordionTrigger className="text-lg font-semibold"><Youtube className="mr-2 text-red-500" />YouTube Shorts</AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-2">
                                     <ContentSection title="Shorts Scripts" items={content.platformContent.youtubeShorts.shortScripts} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            ) : (
                 <div className="text-center py-12">
                    <p>Content is being generated. Check back soon!</p>
                </div>
            )}
        </TabsContent>
        <TabsContent value="transcript" className="mt-6">
            <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
                 <CardHeader>
                    <CardTitle className="font-headline">Cleaned Transcript</CardTitle>
                    <CardDescription>Full episode transcript with filler words removed.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                        {episode.processingResult?.cleanedTranscript || "Transcript not available."}
                    </p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ScoreGauge({ title, score, suffix = "/10", value }: { title: string; score: number; suffix?: string; value?: number }) {
    const finalValue = value ?? score;
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="relative h-28 w-28">
                 <ChartContainer
                    config={{}}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <RadialBarChart
                      innerRadius="65%"
                      outerRadius="100%"
                      barSize={10}
                      data={[{ name: title, value: finalValue, fill: 'hsl(var(--primary))' }]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="fill-primary/10"
                      />
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={5}
                        className="fill-primary"
                      />
                    </RadialBarChart>
                  </ChartContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold font-headline text-primary">{score}</span>
                    <span className="text-xs text-primary/80">{suffix}</span>
                </div>
            </div>
             <p className="mt-2 text-sm font-medium text-center">{title}</p>
        </div>
    )
}

function ScoreItem({ title, score }: { title: string; score: number }) {
    return (
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <p className="font-medium">{title}</p>
            <p className="font-semibold font-headline text-lg text-primary">{score}/10</p>
        </div>
    )
}

function ContentSection({ title, items }: { title: string, items: (string | { content: string, type: 'badge' })[] }) {
    return (
        <div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <div className="space-y-3">
            {items.map((item, index) => {
                const content = typeof item === 'string' ? item : item.content;
                const type = typeof item === 'string' ? 'text' : item.type;
                if (type === 'badge') {
                    return <Badge key={index} variant="secondary">{content}</Badge>
                }
                return (
                    <div key={index} className="p-3 text-sm rounded-md bg-muted/50 text-foreground/80 relative group">
                        {content}
                        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}
