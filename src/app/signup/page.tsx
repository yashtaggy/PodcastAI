"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<"signup" | "confirm">("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      setStep("confirm");

    } catch (err: any) {
      if (err.name === "UsernameExistsException") {
        setError("User already exists. Please login instead.");
      } else {
        setError(err.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError("");

      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      alert("Account created successfully. Please login.");
      router.push("/login");

    } catch (err: any) {
      setError(err.message || "Confirmation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });
      alert("Confirmation code resent.");
    } catch (err: any) {
      setError(err.message || "Could not resend code");
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

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(196,181,253,0.25),transparent_40%)] animate-pulse" />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-8">

        {/* Logo Space */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 border border-white/20 shadow-inner">
            <img
              src="/podcast-logo.png"
              alt="PodCast AI Logo"
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>

        {step === "signup" && (
          <>
            <h2 className="text-3xl font-semibold text-white text-center mb-2">
              Create Account
            </h2>
            <p className="text-purple-200 text-center mb-6">
              Join PodCast AI and build authority with AI
            </p>

            <div className="space-y-4">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
              />

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#a3e635] to-[#22c55e] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

              {/* Login Link */}
              <div className="text-center text-sm text-purple-200 mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#a3e635] hover:underline"
                >
                  Login
                </Link>
              </div>

            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            <h2 className="text-3xl font-semibold text-white text-center mb-2">
              Verify Your Email
            </h2>
            <p className="text-purple-200 text-center mb-6">
              Enter the confirmation code sent to your email
            </p>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Enter confirmation code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all"
              />

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#a3e635] to-[#22c55e] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
              >
                {loading ? "Confirming..." : "Confirm Account"}
              </button>

              <button
                onClick={handleResend}
                className="text-sm text-[#a3e635] hover:underline w-full text-center"
              >
                Resend Code
              </button>

              {/* Back Button */}
              <button
                onClick={() => setStep("signup")}
                className="text-sm text-purple-300 hover:underline w-full text-center mt-2"
              >
                ← Back to Signup
              </button>

            </div>
          </>
        )}

      </div>

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