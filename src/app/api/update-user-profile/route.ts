import { NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

export async function POST(req: Request) {
  try {
    const { userId, name, podcastDomain, preferredLanguage, avatar } =
      await req.json();

    await dynamoDb.send(
      new UpdateCommand({
        TableName: "podcastai-users",
        Key: { userId },
        UpdateExpression:
          "SET #name = :name, podcastDomain = :domain, preferredLanguage = :lang, avatar = :avatar, isProfileComplete = :complete",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":domain": podcastDomain,
          ":lang": preferredLanguage,
          ":avatar": avatar,
          ":complete": true,
        },
      })
    );

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}