# **App Name**: PodVision AI

## Core Features:

- Creator Authentication & Profile Setup: Securely authenticate users via AWS Cognito (email/password, Google OAuth), create creator profiles in DynamoDB, and collect initial preferences like podcast niche, target audience, and content style.
- Podcast Episode Upload: Enable users to upload podcast audio files to Amazon S3. The system will save episode metadata to DynamoDB and automatically trigger the AWS Step Functions AI processing pipeline.
- AI-Powered Audio Transcription & Cleaning: Utilize Whisper API for accurate transcription, and an LLM tool to detect and identify filler words and silence segments, returning a cleaned transcript and timestamped edits to DynamoDB.
- AI-Driven Engagement & Viral Scoring: Employ an LLM tool to analyze transcribed content in chunks, identify emotional peaks, detect drop-off risks, assign a 'PodScore', and predict viral potential based on episode performance.
- AI-Generated Social Media Content: A powerful AI tool that generates ready-to-use viral social media assets (e.g., hooks, captions, hashtags, tweet threads, short video scripts) for platforms like Instagram, LinkedIn, and Twitter from high-engagement audio segments.
- Content Review & Simulated Scheduling: Allow creators to review AI-generated social media content and 'simulate' scheduling posts for specific platforms and times using dummy data. This feature integrates with a basic AWS EventBridge simulation.
- Basic Analytics Dashboard: Provide a clean dashboard to display essential metrics such as average PodScore, viral score trends, and the status of episode processing and content generation.

## Style Guidelines:

- Primary color: A sophisticated and vibrant purple-violet (#844DF0) to evoke innovation and creativity.
- Background color: A very dark, desaturated purplish-grey (#271F2E) for a premium SaaS dark mode dashboard feel.
- Accent color: A dynamic blue-violet (#7F6BFC) used for interactive elements, highlights, and subtle gradient effects.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-forward, and crisp feel. Body text font: 'Inter' (sans-serif) for excellent readability and a clean, neutral presentation of data and information.
- Employ a suite of clean, minimalist line icons that align with the dashboard's professional and high-tech aesthetic, using gradients for visual depth on active states.
- Implement 'glassmorphism' card-style elements for data presentation, creating a subtle translucent and blurred effect over a structured grid layout within a dark, expansive dashboard.
- Incorporate smooth, subtle transitions and hover effects for navigation, data loading, and interactive elements, ensuring a responsive and 'premium startup' user experience without distractions.