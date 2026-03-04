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
import { Sparkles, CheckCircle2, Rocket, Mic, Brain, TrendingUp, Activity, Cpu, Coins, Zap } from "lucide-react";
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-500 p-6">

      {/* High-Contrast Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/30 blur-[130px] animate-mesh-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/20 blur-[130px] animate-mesh-2"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/25 blur-[130px] animate-mesh-3"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[45%] h-[45%] rounded-full bg-purple-500/20 blur-[130px] animate-mesh-4"></div>
      </div>

      {/* Deep Glow Overlays */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-rose-900/5 to-transparent pointer-events-none"></div>

      {/* Moving Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.1),transparent_40%)] animate-pulse" />

      {/* Floating Aesthetic Objects */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[
          { Icon: Mic, color: "text-purple-400", size: 48, top: "15%", left: "10%", delay: "0s", duration: "15s" },
          { Icon: Brain, color: "text-rose-400", size: 64, top: "25%", left: "75%", delay: "-2s", duration: "18s" },
          { Icon: TrendingUp, color: "text-violet-400", size: 56, top: "65%", left: "15%", delay: "-5s", duration: "20s" },
          { Icon: Activity, color: "text-purple-300", size: 40, top: "75%", left: "80%", delay: "-7s", duration: "16s" },
          { Icon: Cpu, color: "text-rose-300", size: 52, top: "45%", left: "20%", delay: "-3s", duration: "22s" },
          { Icon: Sparkles, color: "text-violet-300", size: 32, top: "10%", left: "60%", delay: "-8s", duration: "14s" },
          { Icon: Coins, color: "text-purple-400", size: 44, top: "85%", left: "40%", delay: "-1s", duration: "19s" },
          { Icon: Zap, color: "text-rose-400", size: 36, top: "50%", left: "85%", delay: "-4s", duration: "17s" },
        ].map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.color} opacity-30 blur-[1px] flex items-center justify-center`}
            style={{
              top: item.top,
              left: item.left,
              animationName: 'floatWavy',
              animationDuration: item.duration,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay: item.delay,
            }}
          >
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl scale-110">
              <item.Icon size={item.size} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-white/5 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-2xl mb-4 group cursor-pointer hover:rotate-3 transition-transform">
            <Logo className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.1]">
            Welcome to <span className="text-purple-400 italic">PodCast AI</span>
          </h1>
          <p className="text-white/60 text-lg max-w-md font-medium">
            Let's personalize your creative engine. It only takes a minute.
          </p>
        </div>

        <Card className="glass-vivid overflow-hidden rounded-[2.5rem] shadow-2xl">
          <CardHeader className="p-6 md:p-10 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black tracking-tight text-white">Setup Your Profile</CardTitle>
              <CardDescription className="text-white/40 font-medium">Define your voice & presence</CardDescription>
            </div>
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </CardHeader>

          <CardContent className="p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-white/40">Creator Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Yash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 px-4 rounded-2xl border-white/30 bg-background/20 focus:ring-primary shadow-sm text-lg font-medium text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-sm font-bold uppercase tracking-widest text-white/40">Podcast Domain</Label>
                  <Input
                    id="domain"
                    placeholder="e.g. AI News, Tech Hub"
                    value={podcastDomain}
                    onChange={(e) => setPodcastDomain(e.target.value)}
                    className="h-14 px-4 rounded-2xl border-white/30 bg-background/20 focus:ring-primary shadow-sm text-lg font-medium text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-white/40">Preferred Language</Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="h-14 rounded-2xl border-white/30 bg-background/20 text-lg font-medium text-foreground">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-white/10 bg-slate-900/90 backdrop-blur-xl text-white">
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
                <Label className="text-sm font-bold uppercase tracking-widest text-white/40 block mb-2">Choose Avatar</Label>
                <div className="grid grid-cols-3 gap-4">
                  {creativeAvatars.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAvatar(item.path)}
                      className={`relative aspect-square rounded-3xl p-1 transition-all group overflow-hidden border-2 ${avatar === item.path
                        ? "border-purple-500 bg-purple-500/10 shadow-lg scale-105"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
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
                        <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full p-0.5 shadow-sm">
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
              className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-xl font-black shadow-xl shadow-purple-500/20 transition-all hover:translate-y-[-2px] active:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

        <p className="text-center text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
          Powered by PodCast AI Intelligence
        </p>
      </div>

      <style jsx>{`
        @keyframes floatWavy {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
          100% { transform: translate(40px, -30px) rotate(3deg); }
        }
        @keyframes mesh-1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 15%) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes mesh-2 {
          0% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-15%, -10%) scale(1); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        @keyframes mesh-3 {
          0% { transform: translate(0, 0) opacity: 0.5; }
          50% { transform: translate(-10%, 20%) opacity: 0.8; }
          100% { transform: translate(0, 0) opacity: 0.5; }
        }
        @keyframes mesh-4 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20%, -10%) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-mesh-1 {
          animation: mesh-1 20s infinite alternate ease-in-out;
        }
        .animate-mesh-2 {
          animation: mesh-2 25s infinite alternate ease-in-out;
        }
        .animate-mesh-3 {
          animation: mesh-3 30s infinite alternate ease-in-out;
        }
        .animate-mesh-4 {
          animation: mesh-4 22s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
