import { NextResponse } from "next/server";
import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "podcastai-episodes";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      episodeId,
      userId,
      title,
      description,
      transcript,
      analysis,
      uploadedAt,
    } = body;

    if (!episodeId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          episodeId,
          userId,
          title,
          description,
          transcript,
          analysis,
          uploadedAt,
        },
      })
    );

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Dynamo Save Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}