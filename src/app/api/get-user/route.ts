import { NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: "podcastai-users",
        Key: { userId },
      })
    );

    return NextResponse.json(result.Item || null);

  } catch (error: any) {
    console.error("Get User Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}