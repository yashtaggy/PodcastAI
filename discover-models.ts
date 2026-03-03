import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

async function listAllModels() {
    const apiKey = process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
        console.error("No GEMINI_API_KEY found");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // We can't actually "list" with the standard web SDK easily without admin access or specific scopes
        // But we can try common variations
        const modelsToTry = [
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`Testing model: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Say hello");
                const response = await result.response;
                console.log(`✅ ${modelName} works. Response: ${response.text().substring(0, 20)}...`);
            } catch (e: any) {
                console.log(`❌ ${modelName} failed: ${e.message}`);
            }
        }
    } catch (err: any) {
        console.error("General error:", err.message);
    }
}

listAllModels();
