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
</head>

<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;">

<tr>
<td align="center" style="background:#0f172a;padding:30px;">

<img 
src="https://podcastai-assets.s3.ap-south-1.amazonaws.com/podcast-logo.png" 
alt="PodcastAI" 
width="140"
/>

</td>
</tr>

<tr>
<td style="padding:40px">

<h2 style="margin-top:0;color:#0f172a;">
Welcome to PodcastAI 🎙
</h2>

<p style="font-size:16px;color:#334155;">
We're excited to have you join <strong>PodcastAI</strong> — the AI platform designed
to help creators build authority through podcasting.
</p>

<p style="font-size:16px;color:#334155;">
Inside PodcastAI you can:
</p>

<ul style="font-size:15px;color:#334155;line-height:1.6">
<li>🎯 Plan and launch podcasts with AI guidance</li>
<li>📊 Analyze episodes with <strong>PodScore</strong></li>
<li>🔥 Generate viral content using the <strong>Authority Engine</strong></li>
<li>📅 Auto-schedule distribution with the <strong>Distribution Hub</strong></li>
</ul>

<table cellpadding="0" cellspacing="0" style="margin-top:30px;">
<tr>
<td align="center">

<a 
href="https://zz3deht72s.us-east-1.awsapprunner.com/"
style="
background:#4f46e5;
color:#ffffff;
padding:14px 28px;
border-radius:6px;
text-decoration:none;
font-weight:bold;
display:inline-block;
"
>
Open PodcastAI
</a>

</td>
</tr>
</table>

<p style="margin-top:30px;color:#475569;font-size:14px;">
Your podcast authority journey starts now.
</p>

<p style="color:#475569;font-size:14px;">
— Team PodcastAI
</p>

</td>
</tr>

<tr>
<td align="center" style="background:#f1f5f9;padding:20px;font-size:12px;color:#64748b;">

PodcastAI • AI tools for podcast creators

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