"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle2, Rocket } from "lucide-react";
import Image from "next/image";

const creativeAvatars = [
  { id: "mic", path: "/avatars/mic.png", label: "Studio Mic" },
  { id: "robot", path: "/avatars/robot.png", label: "AI Robot" },
  { id: "rocket", path: "/avatars/rocket.png", label: "Launch Rocket" },
  { id: "aura", path: "/avatars/aura.png", label: "Voice Aura" },
  { id: "pulsor", path: "/avatars/pulsor.png", label: "Sound Pulse" },
  { id: "vinyl", path: "/avatars/vinyl.png", label: "Digital Vinyl" },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [podcastDomain, setPodcastDomain] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("/avatars/mic.png");

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        const payload = session.tokens?.idToken?.payload;
        setUserId(payload?.sub || null);
      } catch {
        router.push("/login");
      }
    };

    loadUser();
  }, [router]);

  const handleSubmit = async () => {
    try {
      if (!userId) return;
      if (!name || !podcastDomain) {
        setError("Please fill in all details.");
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch("/api/update-user-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          podcastDomain,
          preferredLanguage,
          avatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 transition-colors">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 animate-pulse">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl z-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-3xl border border-border/50 shadow-xl mb-4 group cursor-pointer hover:rotate-3 transition-transform">
            <Logo className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[1.1]">
            Welcome to <span className="text-primary italic">PodCast AI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md font-medium">
            Let's personalize your creative engine. It only takes a minute.
          </p>
        </div>

        <Card className="border-border shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="p-8 md:p-10 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black tracking-tight">Setup Your Profile</CardTitle>
              <CardDescription className="text-muted-foreground font-medium">Define your voice & presence</CardDescription>
            </div>
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </CardHeader>

          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Creator Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Yash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 px-4 rounded-2xl border-border bg-background/50 focus:ring-primary shadow-sm text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Podcast Domain</Label>
                  <Input
                    id="domain"
                    placeholder="e.g. AI News, Tech Hub"
                    value={podcastDomain}
                    onChange={(e) => setPodcastDomain(e.target.value)}
                    className="h-14 px-4 rounded-2xl border-border bg-background/50 focus:ring-primary shadow-sm text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Preferred Language</Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="h-14 rounded-2xl border-border bg-background/50 text-lg font-medium">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border">
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">Choose Avatar</Label>
                <div className="grid grid-cols-3 gap-4">
                  {creativeAvatars.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAvatar(item.path)}
                      className={`relative aspect-square rounded-3xl p-1 transition-all group overflow-hidden border-2 ${avatar === item.path
                          ? "border-primary bg-primary/10 shadow-lg scale-105"
                          : "border-border bg-background/50 hover:bg-white dark:hover:bg-slate-800"
                        }`}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={item.path}
                          alt={item.label}
                          fill
                          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${avatar === item.path ? "scale-100" : "scale-90 opacity-70"
                            }`}
                        />
                      </div>
                      {avatar === item.path && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-black shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Initializing Engine...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Continue to Workspace <Rocket className="w-6 h-6" />
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-sm font-bold uppercase tracking-[0.2em]">
          Powered by PodCast AI Intelligence
        </p>
      </div>
    </div>
  );
}