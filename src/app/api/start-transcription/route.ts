import { NextResponse } from "next/server";
import {
  TranscribeClient,
  StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

const transcribe = new TranscribeClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    const jobName = `podcastai-${Date.now()}`;

    await transcribe.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: jobName,
        LanguageCode: "en-IN",
        Media: {
          MediaFileUri: `s3://${BUCKET_NAME}/${key}`,
        },
        OutputBucketName: BUCKET_NAME,

        // 🔥 LEVEL C FEATURES
        Settings: {
          ShowSpeakerLabels: true,
          MaxSpeakerLabels: 10,   // Change if needed
        },

        // Enable detailed timestamps
        ContentRedaction: undefined,
        IdentifyLanguage: false,
      })
    );

    return NextResponse.json({
      success: true,
      jobName,
    });

  } catch (error: any) {
    console.error("Transcription Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}