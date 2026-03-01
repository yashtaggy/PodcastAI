"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, fetchAuthSession } from "aws-amplify/auth";
import Link from "next/link";
import { Logo } from "@/components/logo";

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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.idToken) {
          router.push("/dashboard");
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

      const session = await fetchAuthSession();
      const payload = session.tokens?.idToken?.payload;

      const userId = payload?.sub;
      const userEmail = payload?.email;

      if (userId && userEmail) {
        await fetch("/api/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, email: userEmail }),
        });
      }

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
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#6b21a8]">

      {/* Animated Sound Bars */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-[#a3e635] to-[#c4b5fd] animate-wave"
            style={{
              height: `${Math.random() * 80 + 40}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Moving Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(196,181,253,0.25),transparent_40%)] animate-pulse" />

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-6">

          {/* LOGO SPACE */}
          <div className="flex justify-center">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 border border-white/20 shadow-inner overflow-hidden">
              <Logo className="h-16 w-16" />
            </div>
          </div>

          <div>
            <CardTitle className="text-3xl font-headline text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-purple-200 mt-2">
              Enter your credentials to access PodCast AI
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5">

            <div className="grid gap-2">
              <Label className="text-purple-200">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-purple-200">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
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
              className="w-full bg-gradient-to-r from-[#a3e635] to-[#22c55e] text-black font-semibold hover:opacity-90 transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-purple-200">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#a3e635] hover:underline"
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
        .animate-wave {
          animation: wave 1.5s infinite ease-in-out;
        }
      `}</style>

    </div>
  );
}