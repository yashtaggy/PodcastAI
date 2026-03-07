import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: "ap-south-1",
});

export async function sendWelcomeEmail(email: string, name?: string) {

  const command = new SendEmailCommand({
    Source: "info.podcastai@gmail.com",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "🎙 Welcome to PodcastAI",
      },
      Body: {
        Html: {
          Data: `
          <h2>Welcome to PodcastAI 🚀</h2>

          <p>Hi ${name ?? "there"},</p>

          <p>
          We're excited to have you join PodcastAI — the AI platform designed
          to help creators build authority through podcasting.
          </p>

          <h3>What you can do inside PodcastAI:</h3>

          <ul>
            <li>🎯 Plan and launch podcasts with AI guidance</li>
            <li>📊 Analyze episodes with PodScore</li>
            <li>🔥 Generate viral content using Authority Engine</li>
            <li>📅 Auto-schedule distribution with Distribution Hub</li>
          </ul>

          <p>
          Your podcast authority journey starts now.
          </p>

          <p>
          — Team PodcastAI
          </p>
          `,
        },
      },
    },
  });

  await sesClient.send(command);
}