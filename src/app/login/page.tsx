"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, fetchAuthSession, signInWithRedirect } from "aws-amplify/auth";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mic, Brain, TrendingUp, Activity, Cpu, Sparkles, Coins, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePostAuth = async () => {
    try {
      setLoading(true);
      const session = await fetchAuthSession();
      const payload = session.tokens?.idToken?.payload;

      const userId = payload?.sub;
      const userEmail = payload?.email;

      if (!userId || !userEmail) return;

      await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email: userEmail }),
      });

      const response = await fetch("/api/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const userData = await response.json();

      if (!userData?.isProfileComplete) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Post-auth logic failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.idToken) {
          handlePostAuth();
        }
      } catch { }
    };
    checkUser();
  }, [router]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      await signIn({
        username: email,
        password,
      });

      handlePostAuth();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect({
        provider: "Google",
      });
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-background transition-colors duration-500">

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
            className={`absolute ${item.color} opacity-40 blur-[1px] flex items-center justify-center`}
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
            <div className="p-4 rounded-3xl bg-background/20 border border-foreground/10 backdrop-blur-md shadow-2xl scale-125">
              <item.Icon size={item.size} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* Animated Sound Bars */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 opacity-10 z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-[#a3e635] to-[#c4b5fd] animate-wave"
            style={{
              height: `${((i * 137) % 60) + 20}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Moving Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.15),transparent_40%)] animate-pulse" />

      <Card className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl glass-vivid rounded-[2.5rem] p-4">
        <CardHeader className="text-center space-y-6">

          {/* LOGO SPACE */}
          <div className="flex justify-center">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/20 border border-foreground/10 shadow-inner overflow-hidden">
              <Logo className="h-16 w-16" />
            </div>
          </div>

          <div>
            <CardTitle className="text-3xl font-headline text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Enter your credentials to access PodCast AI
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5">

            <div className="grid gap-2 text-left">
              <Label className="text-foreground/70 font-bold">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/40 border-slate-200 dark:border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-14 rounded-2xl shadow-sm"
              />
            </div>

            <div className="grid gap-2 text-left">
              <Label className="text-foreground/70 font-bold">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/40 border-slate-200 dark:border-white/20 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-14 rounded-2xl shadow-sm"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-6 rounded-xl hover:scale-[1.02] shadow-xl shadow-purple-500/20 transition-all active:scale-95 border border-white/10"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full bg-background/50 border-slate-200 dark:border-white/10 py-6 rounded-xl hover:bg-background/80 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>

            <div className="text-center text-sm text-foreground/50">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Sign up
              </Link>
            </div>

          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.4); }
        }
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
        .animate-wave {
          animation: wave 1.5s infinite ease-in-out;
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