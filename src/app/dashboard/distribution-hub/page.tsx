"use client";

import { useState, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { EpisodesContext } from '@/context/episodes-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { 
    Calendar, 
    Clock, 
    CheckCircle2, 
    Bell,
    Smartphone,
    Target,
    Lightbulb,
    CalendarDays,
    Rocket,
    PlusCircle,
    ChevronRight,
    Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DistributionHubPage() {
  const router = useRouter();
  const { episodes } = useContext(EpisodesContext);
  const { toast } = useToast();
  const [isAutoPostingEnabled, setIsAutoPostingEnabled] = useState(false);
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);

  const processedEpisodes = useMemo(() => episodes.filter(ep => ep.status === 'processed'), [episodes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("onboardingData");
      if (data) {
        setOnboardingData(JSON.parse(data));
      }
    }
  }, []);

    // Load onboarding data once

  const handleAddToCalendar = (eventTitle: string) => {
    toast({ title: "Calendar Sync", description: `"${eventTitle}" has been added to your content calendar.` });
  }

    const handleEpisodeSelect = (episodeId: string) => {
        setSelectedEpisodeId(episodeId);
        if (typeof window === 'undefined') return;
        const raw = localStorage.getItem(`schedule_${episodeId}`);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                // if parsed is an object with calendarEvents, normalize to array
                if (Array.isArray(parsed)) {
                    setScheduleData(parsed);
                } else if (parsed && parsed.calendarEvents) {
                    setScheduleData(parsed.calendarEvents);
                } else {
                    setScheduleData([]);
                }
            } catch (e) {
                setScheduleData([]);
            }
        } else {
            setScheduleData([]);
        }
    }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h1 className="font-headline text-3xl flex items-center gap-3"><CalendarDays className="text-primary"/>Distribution Hub</h1>
                <p className="text-muted-foreground">Manage your content calendar, smart scheduling, and multi-platform distribution.</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border">
                    <Label className="text-xs font-bold uppercase tracking-wider ml-2">Auto-Posting</Label>
                    <Switch 
                        checked={isAutoPostingEnabled} 
                        onCheckedChange={(val) => {
                            setIsAutoPostingEnabled(val);
                            toast({ 
                                title: val ? "Auto-Posting Enabled" : "Auto-Posting Disabled", 
                                description: val ? "AI will now handle the distribution of generated packages." : "You will need to manually approve posts." 
                            });
                        }} 
                    />
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar / Controls */}
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Select Episode Package</CardTitle>
                        <CardDescription>View scheduling for a specific episode.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search episodes..." className="pl-8" />
                        </div>
                        <div className="space-y-2">
                            {processedEpisodes.map(episode => (
                                <button
                                    key={episode.id}
                                    type="button"
                                    onClick={() => handleEpisodeSelect(episode.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition ${selectedEpisodeId === episode.id ? "border-violet-500 bg-slate-800" : "border-slate-700 hover:bg-slate-800"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="truncate text-sm">{episode.title}</span>
                                        <ChevronRight className={`size-4 ${selectedEpisodeId === episode.id ? 'opacity-100' : 'opacity-60'}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                        {processedEpisodes.length === 0 && (
                             <p className="text-xs text-muted-foreground text-center py-4">No processed episodes available.</p>
                        )}
                    </CardContent>
                </Card>

                {onboardingData && (
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Target className="size-4 text-primary"/>Audience Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Target Audience</Label>
                                <p className="text-xs leading-relaxed">{onboardingData.targetAudience}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Posting Frequency</Label>
                                <Badge variant="secondary" className="text-[10px]">{onboardingData.postingFrequency}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Bell className="size-4 text-primary"/>Distribution Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="p-2 bg-green-500/10 rounded-full text-green-500"><CheckCircle2 className="size-4"/></div>
                            <div>
                                <p className="text-xs font-bold uppercase">India Peak Hours</p>
                                <p className="text-[10px] text-muted-foreground">Optimized for IST (9 AM - 11 AM)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="p-2 bg-blue-500/10 rounded-full text-blue-500"><Smartphone className="size-4"/></div>
                            <div>
                                <p className="text-xs font-bold uppercase">Mobile Optimized</p>
                                <p className="text-[10px] text-muted-foreground">Captions ready for small screens</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Calendar / Timeline Area */}
            <div className="lg:col-span-3 space-y-6">
                {!selectedEpisodeId && (
                     <Card className="border-dashed border-2 bg-muted/30 py-20">
                        <CardContent className="flex flex-col items-center text-center space-y-4">
                             <Calendar className="size-16 text-muted-foreground/30" />
                             <div className="space-y-2">
                                <h3 className="font-bold text-xl">No Package Selected</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">Select a generated authority package from the sidebar to view its distribution timeline and smart scheduling.</p>
                             </div>
                             <Button onClick={() => router.push('/dashboard/authority-engine')} variant="outline" className="gap-2">
                                <PlusCircle className="size-4" /> Generate New Package
                             </Button>
                        </CardContent>
                    </Card>
                )}

                {selectedEpisodeId && scheduleData && scheduleData.length > 0 && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2"><Clock className="size-5 text-primary"/>AI Scheduling Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    This episode has an auto-generated distribution plan with <strong>{scheduleData.length}</strong> scheduled events.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Content Timeline</CardTitle>
                                    <CardDescription>Visual guide to your upcoming distribution.</CardDescription>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleAddToCalendar("Full Distribution Timeline")}>
                                    <Calendar className="mr-2 size-4" /> Sync All
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {scheduleData.map((event: any, i: number) => (
                                        <div key={i} className="relative pl-8 pb-6 last:pb-0 group">
                                            {/* Timeline Line */}
                                            {i !== scheduleData.length - 1 && (
                                                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border group-hover:bg-primary/30 transition-colors" />
                                            )}
                                            
                                            {/* Timeline Dot */}
                                            <div className="absolute left-0 top-1.5 size-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                                <div className="size-2 rounded-full bg-primary" />
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card/50 hover:bg-muted/30 transition-all cursor-default group-hover:border-primary/30 group-hover:shadow-sm">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Day {event.day ?? event.dayOffset ?? i + 1}</span>
                                                        <Badge variant="outline" className="capitalize text-[10px]">{event.platform}</Badge>
                                                    </div>
                                                    <h4 className="font-bold text-sm leading-tight">{event.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                        <Lightbulb className="size-3 text-yellow-500"/> {event.description ?? event.reason ?? ''}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                                                    <div className="flex items-center gap-1 text-sm font-bold text-primary">
                                                        <Clock className="size-3"/> {event.time}
                                                    </div>
                                                    <Button size="sm" variant="ghost" className="h-8 text-[10px] uppercase font-bold tracking-wider" onClick={() => handleAddToCalendar(event.title)}>
                                                        Sync
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                     {selectedEpisodeId && (!scheduleData || scheduleData.length === 0) && (
                     <Card className="py-20 text-center">
                        <CardContent className="space-y-4">
                             <Rocket className="size-12 mx-auto text-muted-foreground/50" />
                             <div className="space-y-2">
                                <h3 className="font-bold text-xl">No Schedule Generated</h3>
                                <p className="text-muted-foreground">This episode hasn't been processed by the Authority Engine yet.</p>
                             </div>
                             <Button onClick={() => router.push('/dashboard/authority-engine')}>
                                Generate Authority Package
                             </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
