import { NextResponse } from "next/server";
import { generateViralContent } from "@/ai/flows/ai-viral-content-flow";
import type { AiViralContentInput } from "@/ai/flows/ai-viral-content-flow";

export async function POST(req: Request) {
  try {
    const body: AiViralContentInput = await req.json();

    // Basic validation guard
    if (!body.podcastTopic || !body.cleanTranscript || !body.platforms) {
      return NextResponse.json(
        { error: "Invalid input data." },
        { status: 400 }
      );
    }

    const result = await generateViralContent(body);

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("AUTHORITY ENGINE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to generate viral content.",
        message: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}