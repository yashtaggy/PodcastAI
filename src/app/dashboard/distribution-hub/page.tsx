"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import { EpisodesContext } from "@/context/episodes-context";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";

import {
  CalendarDays,
  Calendar,
  Clock,
  TrendingUp,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  Radio,
  Sparkles,
  Globe,
  Flame,
  Users,
  Share2,
  Lock,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLATFORM_META: Record<
  string,
  { Icon: any; color: string; bg: string }
> = {
  YouTube: {
    Icon: Youtube,
    color: "#FF4040",
    bg: "rgba(255,64,64,0.08)",
  },
  Instagram: {
    Icon: Instagram,
    color: "#E040FB",
    bg: "rgba(224,64,251,0.08)",
  },
  LinkedIn: {
    Icon: Linkedin,
    color: "#3EAAFF",
    bg: "rgba(62,170,255,0.08)",
  },
  Twitter: {
    Icon: Twitter,
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.08)",
  },
};

export default function DistributionHubPage() {
  const { episodes } = useContext(EpisodesContext);

  const processedEpisodes = useMemo(
    () => episodes.filter((ep: any) => ep.status === "processed"),
    [episodes]
  );

  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [reach, setReach] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [autoPosting, setAutoPosting] = useState(false);
  const [synced, setSynced] = useState(false);

  /* NEW AI FEATURES */

  const [viralWindow, setViralWindow] = useState<any>(null);
  const [audienceExpansion, setAudienceExpansion] = useState<any[]>([]);
  const [crossPromo, setCrossPromo] = useState<any[]>([]);

  async function generatePlan() {
    if (!selectedEpisode) return;

    setLoading(true);

    const res = await fetch("/api/ai-distribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: selectedEpisode.title,
        description: selectedEpisode.description,
      }),
    });

    const data = await res.json();

    setSchedule(data.calendar || []);
    setReach(data.reach || {});

    /* NEW DATA */

    setViralWindow(data.viralWindow || null);
    setAudienceExpansion(data.audienceExpansion || []);
    setCrossPromo(data.crossPromotion || []);

    setLoading(false);
  }

  useEffect(() => {
    if (selectedEpisode) generatePlan();
  }, [selectedEpisode]);

  async function syncCalendar() {
    await fetch("/api/google-calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: schedule }),
    });

    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  }

  return (
    <>

      <div className="w-full space-y-8 animate-in fade-in duration-700">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50 backdrop-blur-md p-6 rounded-[2rem] border border-border/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <CalendarDays className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-headline font-black tracking-tight text-foreground">
                Distribution Hub
              </h1>
              <p className="text-muted-foreground text-sm">Automate your content reach across Bharats ecosystem</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-muted/30 px-4 py-2 rounded-2xl border border-border/50">
            <Zap className="text-amber-500 w-4 h-4" />
            <span className="text-sm font-bold">Auto Distribution</span>
            <Switch
              checked={autoPosting}
              onCheckedChange={setAutoPosting}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: EPISODES */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-none shadow-xl glass-vivid rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  <CardTitle className="text-lg font-bold">Episodes</CardTitle>
                </div>
                <CardDescription>Select to generate plan</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {processedEpisodes.length > 0 ? (
                  processedEpisodes.map((episode: any) => (
                    <button
                      key={episode.id}
                      onClick={() => setSelectedEpisode(episode)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col gap-1 group",
                        selectedEpisode?.id === episode.id
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                          : "bg-background/40 border-border/50 hover:border-primary/50 hover:bg-background/60 text-foreground"
                      )}
                    >
                      <span className="font-bold line-clamp-1">{episode.title}</span>
                      <span className={cn(
                        "text-[10px] uppercase font-black tracking-widest opacity-60",
                        selectedEpisode?.id === episode.id ? "text-primary-foreground" : "text-muted-foreground"
                      )}>
                        {episode.status}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No processed episodes yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="lg:col-span-9">
            {selectedEpisode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">

                {/* SMART CALENDAR */}
                <Card className="md:col-span-2 border-none shadow-2xl glass-vivid rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Smart Calendar</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black">ACTIVE</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-6">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                        <p className="text-muted-foreground font-medium">AI is crafting your distribution timeline...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {schedule.map((item: any, i: number) => {
                          const meta = PLATFORM_META[item.platform];
                          const Icon = meta?.Icon || Globe;
                          return (
                            <div
                              key={i}
                              className="group relative p-5 rounded-[1.5rem] border border-border/50 bg-background/30 hover:bg-background/50 hover:border-primary/30 transition-all duration-300"
                              style={{ borderLeft: `4px solid ${meta?.color || 'var(--primary)'}` }}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{item.day}</span>
                                <div className="p-1.5 rounded-lg" style={{ background: meta?.bg || 'var(--primary-muted)' }}>
                                  <Icon size={14} color={meta?.color} />
                                </div>
                              </div>
                              <h4 className="font-bold text-sm mb-2 line-clamp-2">{item.content}</h4>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-muted/30 w-fit px-2 py-1 rounded-md">
                                <Clock size={10} /> {item.time}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <Button
                      onClick={syncCalendar}
                      className={cn(
                        "w-full h-14 rounded-2xl font-black text-lg transition-all shadow-xl",
                        synced
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                      )}
                    >
                      {synced ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Calendar Synced!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Share2 className="w-5 h-5" /> Sync with Your Calendar
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* PREDICTED REACH */}
                <Card className="border-none shadow-xl glass-vivid rounded-[2rem]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <TrendingUp className="w-4 h-4" />
                        <span>Predicted Reach</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">LIVE</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(reach).map(([platform, value]: any) => {
                      const meta = PLATFORM_META[Object.keys(PLATFORM_META).find(k => k.toLowerCase() === platform.toLowerCase()) || ""];
                      const Icon = meta?.Icon || Globe;
                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 font-bold">
                              <Icon size={14} color={meta?.color} />
                              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </div>
                            <span className="font-black text-primary">{value}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${value}%`, background: meta?.color || 'var(--primary)' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* AI VIRAL WINDOW - COMING SOON */}
                <Card className="border-none shadow-xl bg-background/40 rounded-[2rem] border border-border/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Lock className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work in progress</span>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-500 font-bold">
                        <Flame className="w-4 h-4" />
                        <span>AI Viral Window</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold">COMING SOON</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-2xl bg-muted/30 border border-dashed border-border/50 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="text-2xl font-black text-foreground/20">--:--</div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Optimal posting window</p>
                    </div>
                  </CardContent>
                </Card>

                {/* AUDIENCE EXPANSION - COMING SOON */}
                <Card className="border-none shadow-xl bg-background/40 rounded-[2rem] border border-border/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Lock className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work in progress</span>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Users className="w-4 h-4" />
                        <span>Audience Expansion</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold">COMING SOON</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 opacity-20 filter grayscale">
                      <div className="h-12 w-full bg-muted/50 rounded-xl" />
                      <div className="h-12 w-full bg-muted/50 rounded-xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* CROSS PROMOTION - COMING SOON */}
                <Card className="border-none shadow-xl bg-background/40 rounded-[2rem] border border-border/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Lock className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work in progress</span>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-violet-500 font-bold">
                        <Share2 className="w-4 h-4" />
                        <span>Cross Promotion</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold">COMING SOON</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 opacity-20 filter grayscale">
                      <div className="h-20 w-full bg-muted/50 rounded-xl" />
                    </div>
                  </CardContent>
                </Card>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-background/40 rounded-[3rem] border-2 border-dashed border-border/50 space-y-6">
                <div className="p-6 bg-primary/10 rounded-full animate-bounce">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <div className="max-w-md">
                  <h2 className="text-3xl font-headline font-black mb-4">Ready to Go Viral?</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Select an episode from the left sidebar to generate your AI-powered distribution plan and smart calendar.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-black animate-pulse">
                    <ArrowRight className="w-5 h-5" />
                    Select an episode to start
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}