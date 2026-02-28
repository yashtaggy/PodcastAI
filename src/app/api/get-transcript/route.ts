import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

async function streamToString(stream: any) {
  return await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf-8"))
    );
  });
}

export async function POST(req: Request) {
  try {
    const { transcriptUrl } = await req.json();

    const fullPath = transcriptUrl.split(".com/")[1];
    const key = fullPath.split("/").slice(1).join("/");

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3.send(command);
    const body = await streamToString(response.Body);

    const data = JSON.parse(body);

    const rawTranscript =
      data?.results?.transcripts?.[0]?.transcript || "";

    const items = data?.results?.items || [];
    const speakerSegments =
      data?.results?.speaker_labels?.segments || [];

    // 🔥 Build structured transcript
    const structuredTranscript: {
      speaker: string;
      text: string;
      startTime: number;
    }[] = [];

    speakerSegments.forEach((segment: any) => {
      const speaker = segment.speaker_label;
      const words: string[] = [];
      let segmentStart = 0;

      segment.items.forEach((item: any, index: number) => {
        const wordItem = items.find(
          (i: any) =>
            i.start_time === item.start_time &&
            i.end_time === item.end_time
        );

        if (wordItem) {
          words.push(wordItem.alternatives[0].content);

          if (index === 0) {
            segmentStart = parseFloat(wordItem.start_time);
          }
        }
      });

      structuredTranscript.push({
        speaker: `Speaker ${parseInt(speaker.replace("spk_", "")) + 1}`,
        text: words.join(" "),
        startTime: segmentStart,
      });
    });

    return NextResponse.json({
      rawTranscript,
      structuredTranscript,
      fullJson: data, // Keep for advanced AI processing
    });

  } catch (error: any) {
    console.error("Get Transcript Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}