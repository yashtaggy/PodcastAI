import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendWelcomeEmail(email: string) {
  await transporter.sendMail({
    from: `"PodcastAI" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "🎙 Welcome to PodcastAI",
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0;padding:0;background-color:#050510;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050510;padding:40px 10px;">
<tr>
<td align="center">

<table width="100%" maxWidth="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#0f172a;border-radius:24px;overflow:hidden;border:1px solid #1e293b;box-shadow: 0 20px 50px rgba(0,0,0,0.5);">

<!-- Animated/Glow Header -->
<tr>
<td align="center" style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 50px 20px;">
  <table align="center" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
<tr>
<td align="center" width="80" height="80" style="background-color:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:30px;">
<img 
src="https://podcastai-assets.s3.ap-south-1.amazonaws.com/podcast-logo.png"
alt="PodCast AI"
width="60"
style="display:block;border:0;"
/>
</td>
</tr>
</table>
  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: -0.04em;">PodCast <span style="font-style: italic; color: #a3e635;">AI</span></h1>
  <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em;">Authority Engine</p>
</td>
</tr>

<tr>
<td style="padding:45px 40px">

<h2 style="margin-top:0;color:#ffffff;font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
Welcome to the PodCast AI 🎙
</h2>

<p style="font-size:16px;color:#94a3b8;line-height:1.7;">
The digital landscape is crowded, but your voice is unique. We're thrilled to have you join <strong>PodCast AI</strong> — the elite creative intelligence platform designed to build your authority and scale your presence.
</p>

<div style="margin: 30px 0; padding: 25px; background-color: rgba(139, 92, 246, 0.05); border-radius: 20px; border: 1px solid rgba(139, 92, 246, 0.1);">
  <p style="margin: 0 0 15px 0; font-size:14px; color:#a78bfa; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">Your Creator Arsenal:</p>
  
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="30" style="vertical-align: top; padding-top: 5px;">🔥</td>
      <td style="padding-bottom: 12px;">
        <strong style="color: #ffffff; font-size: 15px;">Launch Engine</strong><br/>
        <span style="color: #64748b; font-size: 14px;">Plan and launch high-impact series with AI clarity.</span>
      </td>
    </tr>
    <tr>
      <td width="30" style="vertical-align: top; padding-top: 5px;">📊</td>
      <td style="padding-bottom: 12px;">
        <strong style="color: #ffffff; font-size: 15px;">PodScore Analysis</strong><br/>
        <span style="color: #64748b; font-size: 14px;">Data-driven insights to refine every single word.</span>
      </td>
    </tr>
    <tr>
      <td width="30" style="vertical-align: top; padding-top: 5px;">⚡</td>
      <td style="padding-bottom: 12px;">
        <strong style="color: #ffffff; font-size: 15px;">Authority Engine</strong><br/>
        <span style="color: #64748b; font-size: 14px;">Transform episodes into viral multi-platform content.</span>
      </td>
    </tr>
    <tr>
      <td width="30" style="vertical-align: top; padding-top: 5px;">🌍</td>
      <td>
        <strong style="color: #ffffff; font-size: 15px;">Distribution Hub</strong><br/>
        <span style="color: #64748b; font-size: 14px;">Automate your omnipresence across the global stage.</span>
      </td>
    </tr>
  </table>
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
<tr>
<td align="center">

<a 
href="https://zz3deht72s.us-east-1.awsapprunner.com/"
style="
background: linear-gradient(to right, #7c3aed, #4f46e5);
background-color: #7c3aed;
color:#ffffff;
padding:20px 40px;
border-radius:18px;
text-decoration:none;
font-weight:900;
display:inline-block;
font-size: 16px;
box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
"
>
Initialize Your Workspace
</a>

</td>
</tr>
</table>

<p style="margin-top:50px;color:#475569;font-size:13px; text-align: center; border-top: 1px solid #1e293b; padding-top: 30px;">
"The best time to start a podcast was 10 years ago. The second best time is with AI."
</p>

<p style="color:#ffffff;font-size:15px; text-align: center; font-weight: 800; margin-top: 15px;">
— The PodCast AI Collective
</p>

</td>
</tr>

<tr>
<td align="center" style="background:#050510;padding:40px 20px;font-size:12px;color:#334155;">
  <p style="margin: 0; margin-bottom: 8px; font-weight: 700; letter-spacing: 0.05em; color: #475569;">PODCAST AI • INTELLIGENCE FOR CREATORS</p>
  <p style="margin: 0;">You are receiving this because you initiated the future of your audio brand.</p>
  <p style="margin: 15px 0 0 0;">© 2026 PodCast AI. High Performance Creativity.</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  });
}