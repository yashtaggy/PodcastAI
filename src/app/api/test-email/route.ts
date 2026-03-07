import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/ses";

export async function GET() {
    try {
        await sendTestEmail();

        return NextResponse.json({
            message: "Test email sent successfully 🚀",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Email sending failed" },
            { status: 500 }
        );
    }
}