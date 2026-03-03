import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    try {
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("test");
        console.log("gemini-1.5-flash worked");
    } catch (e: any) {
        console.log("gemini-1.5-flash failed:", e.message);
    }

    try {
        const models = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent("test");
        console.log("gemini-pro worked");
    } catch (e: any) {
        console.log("gemini-pro failed:", e.message);
    }
}

listModels();
