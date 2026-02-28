import { NextResponse } from "next/server";
import {
  TranscribeClient,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

const transcribe = new TranscribeClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { jobName } = await req.json();

    const status = await transcribe.send(
      new GetTranscriptionJobCommand({
        TranscriptionJobName: jobName,
      })
    );

    const job = status.TranscriptionJob;

    return NextResponse.json({
      status: job?.TranscriptionJobStatus,
      transcriptUrl: job?.Transcript?.TranscriptFileUri || null,
    });

  } catch (error: any) {
    console.error("Check Transcription Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}