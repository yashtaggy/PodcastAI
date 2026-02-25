
'use client';

import { useState, useContext, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EpisodesContext } from '@/context/episodes-context';
import { generateViralContent, AiViralContentInput, AiViralContentOutput } from '@/ai/flows/ai-viral-content-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles, Instagram, Linkedin, Twitter, Youtube, Film, MessageSquare, Target, BookText, Quote, Lightbulb, Clapperboard, Briefcase, MessageCircle, YoutubeIcon } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

const platforms = [
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "linkedin", label: "LinkedIn", icon: Briefcase },
    { id: "twitter", label: "Twitter", icon: MessageCircle },
    { id: "youtube", label: "YouTube Shorts", icon: YoutubeIcon },
];

const clipIcons = {
    'Insight': <Lightbulb className="w-5 h-5 text-yellow-400" />,
    'Opinion': <MessageSquare className="w-5 h-5 text-blue-400" />,
    'Story': <BookText className="w-5 h-5 text-green-400" />,
    'Quote': <Quote className="w-5 h-5 text-purple-400" />,
}

const formSchema = z.object({
  episodeId: z.string().min(1, "Please select an episode."),
  platforms: z.array(z.string()).min(1, "Please select at least one platform."),
  brandTone: z.enum(['Professional', 'Bold', 'Casual', 'Humorous']),
});

type AuthorityEngineFormValues = z.infer<typeof formSchema>;

export default function AuthorityEnginePage() {
  const { episodes } = useContext(EpisodesContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<AiViralContentOutput | null>(null);

  const processedEpisodes = useMemo(() => episodes.filter(ep => ep.status === 'processed' && ep.analysis), [episodes]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthorityEngineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: ["instagram", "linkedin", "twitter", "youtube"],
      brandTone: 'Casual',
    },
  });
  
  const selectedPlatforms = watch('platforms') || [];

  const onSubmit = async (data: AuthorityEngineFormValues) => {
    setIsLoading(true);
    setGeneratedContent(null);
    const selectedEpisode = processedEpisodes.find(ep => ep.id === data.episodeId);

    if (!selectedEpisode || !selectedEpisode.analysis) {
        toast({ variant: "destructive", title: "Error", description: "Selected episode is not processed or has no analysis." });
        setIsLoading(false);
        return;
    }

    try {
        const input: AiViralContentInput = {
            podcastTopic: selectedEpisode.title,
            cleanTranscript: selectedEpisode.analysis.cleanTranscript,
            engagementTimeline: selectedEpisode.analysis.engagementTimeline,
            platforms: data.platforms,
            brandTone: data.brandTone,
        };
        const result = await generateViralContent(input);
        setGeneratedContent(result);
        toast({ title: "Success!", description: "Your viral content package is ready." });
    } catch (error) {
        console.error("Failed to generate content:", error);
        toast({ variant: "destructive", title: "Generation Failed", description: "Could not generate content. Please try again." });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
            <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-3"><Sparkles className="text-primary"/>Podcast Authority Engine</CardTitle>
                <CardDescription>
                    Turn one episode into weeks of high-visibility social media content. Select an episode and your preferences to get started.
                </CardDescription>
            </CardHeader>
        </Card>
        
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle>Content Generation Setup</CardTitle>
                    <CardDescription>Choose your source episode and target platforms.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label>Source Episode</Label>
                            <Controller
                                name="episodeId"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a processed episode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {processedEpisodes.length > 0 ? (
                                                processedEpisodes.map(ep => <SelectItem key={ep.id} value={ep.id}>{ep.title}</SelectItem>)
                                            ) : (
                                                <div className="p-4 text-sm text-muted-foreground">No processed episodes found.</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.episodeId && <p className="text-sm text-destructive">{errors.episodeId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Brand Tone</Label>
                            <Controller
                                name="brandTone"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                            <SelectItem value="Bold">Bold</SelectItem>
                                            <SelectItem value="Casual">Casual</SelectItem>
                                            <SelectItem value="Humorous">Humorous</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.brandTone && <p className="text-sm text-destructive">{errors.brandTone.message}</p>}
                        </div>
                    </div>
                     <div className="space-y-3">
                        <Label>Target Platforms</Label>
                        <Controller
                            name="platforms"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {platforms.map((platform) => (
                                        <div key={platform.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`platform-${platform.id}`}
                                                checked={field.value?.includes(platform.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), platform.id])
                                                        : field.onChange(field.value?.filter((value) => value !== platform.id));
                                                }}
                                            />
                                            <platform.icon className="w-5 h-5 text-muted-foreground" />
                                            <Label htmlFor={`platform-${platform.id}`} className="font-normal">{platform.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.platforms && <p className="text-sm text-destructive">{errors.platforms.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Content...</> : "Generate Content Package"}
                    </Button>
                </CardFooter>
            </form>
        </Card>

        {isLoading && (
             <div className="flex flex-col gap-4 items-center justify-center h-60 text-center">
                <div className="flex items-center">
                <Sparkles className="w-12 h-12 animate-pulse text-primary" />
                <p className="ml-4 text-xl font-semibold">Building your content...</p>
                </div>
                <p className="text-muted-foreground max-w-md"><Balancer>The AI is extracting smart clips, writing posts, and tailoring content for your selected platforms. This might take a moment.</Balancer></p>
            </div>
        )}

        {generatedContent && (
             <div className="space-y-8">
                <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl flex items-center gap-3"><Clapperboard className="text-primary"/>AI-Extracted Smart Clips</CardTitle>
                        <CardDescription>The most potent, viral-ready moments from your episode, ready to become clips.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {generatedContent.extractedClips.map((clip, i) => (
                            <AccordionItem value={`clip-${i}`} key={i} className="bg-background/50 border-border/50 rounded-lg px-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        {clipIcons[clip.clipCategory]}
                                        <div className="text-left">
                                            <p className="font-semibold">{clip.clipCategory}</p>
                                            <p className="text-sm text-muted-foreground font-normal">{clip.description}</p>
                                        </div>
                                        <Badge variant="outline" className="ml-auto">
                                            {new Date(clip.timestamp * 1000).toISOString().substr(14, 5)}
                                        </Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="prose prose-sm prose-invert max-w-none bg-muted/30 p-4 rounded-b-md">
                                    <p className="italic">"{clip.transcriptSnippet}"</p>
                                </AccordionContent>
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-3">Your Platform Authority Package</CardTitle>
                        <CardDescription>Here is your generated content, optimized for each platform you selected.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={selectedPlatforms[0] || 'instagram'} className="w-full">
                        <TabsList className={`grid w-full grid-cols-${selectedPlatforms.length > 0 ? selectedPlatforms.length : 1}`}>
                            {selectedPlatforms.includes("instagram") && <TabsTrigger value="instagram"><Instagram className="mr-2"/>Instagram</TabsTrigger>}
                            {selectedPlatforms.includes("linkedin") && <TabsTrigger value="linkedin"><Linkedin className="mr-2"/>LinkedIn</TabsTrigger>}
                            {selectedPlatforms.includes("twitter") && <TabsTrigger value="twitter"><Twitter className="mr-2"/>Twitter</TabsTrigger>}
                            {selectedPlatforms.includes("youtube") && <TabsTrigger value="youtube"><Youtube className="mr-2"/>YouTube</TabsTrigger>}
                        </TabsList>
                        <div className="mt-4 p-4 rounded-lg bg-background/50">
                            {generatedContent.instagram && <TabsContent value="instagram">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><Film/>Reel Scripts</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {generatedContent.instagram.reelScripts.map((script, i) => (
                                    <AccordionItem value={`item-${i}`} key={i}>
                                        <AccordionTrigger>Reel Script #{i + 1}</AccordionTrigger>
                                        <AccordionContent className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">{script}</AccordionContent>
                                    </AccordionItem>
                                    ))}
                                </Accordion>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><MessageSquare/>Captions & Hooks</h3>
                                    <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="hooks">
                                        <AccordionTrigger>Hook Variations ({generatedContent.instagram.hookVariations.length})</AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                                {generatedContent.instagram.hookVariations.map((h, i) => <li key={i}>{h}</li>)}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="captions">
                                        <AccordionTrigger>Caption Variations ({generatedContent.instagram.captionVariations.length})</AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-4">
                                                {generatedContent.instagram.captionVariations.map((c, i) => <li key={i} className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">{c}</li>)}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    </Accordion>
                                    <h3 className="font-semibold text-lg">Hashtags</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {generatedContent.instagram.hashtags.map((tag, i) => <Badge key={i} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                            </div>
                            </TabsContent>}
                            {generatedContent.linkedin && <TabsContent value="linkedin" className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><Target/>Authority Post</h3>
                                    <p className="text-sm text-muted-foreground p-4 mt-2 whitespace-pre-wrap bg-muted/50 rounded-md">{generatedContent.linkedin.authorityPost}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><BookText/>Storytelling Post</h3>
                                    <p className="text-sm text-muted-foreground p-4 mt-2 whitespace-pre-wrap bg-muted/50 rounded-md">{generatedContent.linkedin.storytellingPost}</p>
                                </div>
                            </TabsContent>}
                            {generatedContent.twitter && <TabsContent value="twitter" className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">Tweet Thread</h3>
                                    <p className="text-sm text-muted-foreground p-4 mt-2 whitespace-pre-wrap bg-muted/50 rounded-md">{generatedContent.twitter.tweetThread}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><Quote/>Quote Tweet</h3>
                                    <p className="text-sm text-muted-foreground p-4 mt-2 italic bg-muted/50 rounded-md">"{generatedContent.twitter.quoteTweet}"</p>
                                </div>
                            </TabsContent>}
                            {generatedContent.youtube && <TabsContent value="youtube" className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><Film/>Short Scripts</h3>
                                    <Accordion type="single" collapsible className="w-full">
                                    {generatedContent.youtube.shortScripts.map((script, i) => (
                                    <AccordionItem value={`item-${i}`} key={i}>
                                        <AccordionTrigger>Short Script #{i + 1}</AccordionTrigger>
                                        <AccordionContent className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">{script}</AccordionContent>
                                    </AccordionItem>
                                    ))}
                                </Accordion>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb/>Title Ideas</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        {generatedContent.youtube.titleIdeas.map((title, i) => <li key={i}>{title}</li>)}
                                    </ul>
                                </div>
                            </TabsContent>}
                        </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
