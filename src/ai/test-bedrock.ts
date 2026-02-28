"use server";

import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "@/lib/bedrock";

export async function testTitan() {
  const prompt = `
  Respond in one short sentence:
  What is a podcast?
  `;

  const command = new InvokeModelCommand({
  modelId: "amazon.nova-micro-v1:0",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    messages: [
      {
        role: "user",
        content: [
          {
            text: "Respond in one short sentence: What is a podcast?"
          }
        ]
      }
    ],
    inferenceConfig: {
      maxTokens: 200,
      temperature: 0.5,
      topP: 0.9
    }
  }),
});

  const response = await bedrockClient.send(command);

  const responseBody = JSON.parse(
    new TextDecoder().decode(response.body)
  );

  return responseBody;
}