export async function generatePodScore(transcript: string) {
  const response = await fetch("/api/generate-podscore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    throw new Error("AI API failed");
  }

  return await response.json();
}