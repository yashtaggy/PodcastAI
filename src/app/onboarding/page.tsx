"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [podcastDomain, setPodcastDomain] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("🎙️");

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Complete Your Profile
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Podcast Domain (e.g. Tech, Finance)"
            className="w-full border p-3 rounded"
            value={podcastDomain}
            onChange={(e) => setPodcastDomain(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div>
  <p className="mb-2 font-medium">Choose Your Avatar</p>
  <div className="flex gap-3 text-2xl cursor-pointer">
    {["🎙️", "🚀", "🔥", "🎧", "🎯", "💡"].map((emoji) => (
      <span
        key={emoji}
        onClick={() => setAvatar(emoji)}
        className={`p-2 rounded-full border ${
          avatar === emoji ? "border-black bg-gray-200" : "border-gray-300"
        }`}
      >
        {emoji}
      </span>
    ))}
  </div>
</div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}