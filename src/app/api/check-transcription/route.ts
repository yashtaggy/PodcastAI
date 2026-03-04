import { NextResponse } from "next/server";
import {
  TranscribeClient,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

const REGION = "ap-south-1";

const transcribe = new TranscribeClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { jobName } = await req.json();

    if (!jobName) {
      return NextResponse.json(
        { error: "Missing jobName" },
        { status: 400 }
      );
    }

    const result = await transcribe.send(
      new GetTranscriptionJobCommand({
        TranscriptionJobName: jobName,
      })
    );

    const job = result.TranscriptionJob;

    return NextResponse.json({
      status: job?.TranscriptionJobStatus,
      transcriptUrl: job?.Transcript?.TranscriptFileUri || null,
      failureReason: job?.FailureReason || null,
    });

  } catch (error: any) {
    console.error("🚨 Check Transcription Error:", error);

    return NextResponse.json(
      {
        error: error.message,
        name: error.name,
      },
      { status: 500 }
    );
  }
}