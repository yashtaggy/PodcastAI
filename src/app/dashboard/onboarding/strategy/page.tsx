'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiLaunchStrategyOutput } from "@/ai/flows/ai-launch-strategy-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Calendar, ListChecks, Mic, Lightbulb, Users, FileText, Clock } from "lucide-react";

export default function StrategyPage() {
    const router = useRouter();
    const [strategy, setStrategy] = useState<AiLaunchStrategyOutput | null>(null);

    useEffect(() => {
        const storedStrategy = localStorage.getItem("launchStrategy");
        if (storedStrategy) {
            setStrategy(JSON.parse(storedStrategy));
            // Optional: clear it after reading so it's not stale
            // localStorage.removeItem("launchStrategy");
        } else {
            // If no strategy is found, maybe redirect back to onboarding
            router.push('/dashboard/onboarding');
        }
    }, [router]);

    if (!strategy) {
        return (
            <div className="flex items-center justify-center h-96">
                <Bot className="w-12 h-12 animate-spin text-primary" />
                <p className="ml-4 text-lg">Loading your AI Strategy...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2"><Lightbulb className="text-primary" />Your AI-Generated Launch Strategy</CardTitle>
                    <CardDescription>Here is a personalized plan to kickstart your podcast journey.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Mic /> Podcast Format</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{strategy.podcastFormat}</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListChecks /> Episode Structure</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Intro</h4>
                            <p className="text-muted-foreground">{strategy.episodeStructure.intro}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Segments</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {strategy.episodeStructure.segments.map((segment, i) => <li key={i}>{segment}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Outro</h4>
                            <p className="text-muted-foreground">{strategy.episodeStructure.outro}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock /> Posting Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <h4 className="font-semibold">{strategy.postingStrategy.recommendation}</h4>
                    <p className="text-muted-foreground">{strategy.postingStrategy.reasoning}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Guest Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {strategy.guestRecommendations.map((guest, i) => <Badge key={i} variant="secondary">{guest}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText /> Episode Themes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {strategy.episodeThemes.map((theme, i) => <Badge key={i} variant="outline">{theme}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar /> 30-Day Content Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {strategy.contentPlan.map((item, i) => (
                            <div key={i} className="p-3 rounded-lg bg-muted/50 flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-primary text-lg">Day</span>
                                    <span className="font-headline text-2xl">{item.day}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.idea}</p>
                                    <Badge>{item.platform}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="text-center py-4">
                <Button onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                </Button>
            </div>

        </div>
    );
}
