import { NextResponse } from "next/server";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "@/lib/bedrock";

export async function GET() {
  try {
    const prompt = `
    Respond in one short sentence:
    What is a podcast?
    `;

    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 200,
          temperature: 0.5,
          topP: 0.9,
        },
      }),
    });

    const response = await bedrockClient.send(command);

    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body)
    );

    return NextResponse.json(responseBody);

  } catch (error: any) {
    console.error("BEDROCK ERROR:", error);
    return NextResponse.json(
      { 
        errorMessage: error.message,
        errorName: error.name,
        fullError: error 
      },
      { status: 500 }
    );
  }
}