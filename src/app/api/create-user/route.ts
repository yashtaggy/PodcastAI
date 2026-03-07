import { NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email } = body;

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing userId or email" },
        { status: 400 }
      );
    }

    await dynamoDb.send(
      new PutCommand({
        TableName: "podcastai-users",
        Item: {
          userId,
          email,
          createdAt: new Date().toISOString(),
          isProfileComplete: false,
        },
        ConditionExpression: "attribute_not_exists(userId)",
      })
    );

    console.log("User created:", email);

    // send welcome email
    sendWelcomeEmail(email).catch(console.error);

    console.log("Welcome email sent to:", email);

    return NextResponse.json({ success: true });

  } catch (error: any) {

    if (error.name === "ConditionalCheckFailedException") {
      return NextResponse.json({ success: true });
    }

    console.error("Create User Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}