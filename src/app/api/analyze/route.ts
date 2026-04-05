import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not defined" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert AI coding assistant. Analyze the provided ${language} code. 
Return your response in pure JSON format matching this exact interface:
{
  "explanation": "Detailed explanation of what the code does (format as a markdown bulleted list)",
  "bugs": "List of bugs or issues found, or 'No major bugs found' (format as a markdown bulleted list)",
  "improvements": "Suggested optimizations or best practices (format as a markdown bulleted list)",
  "complexity": "Time and space complexity analysis (format as a markdown bulleted list)",
  "simplified_explanation": "An 'Explain like I'm 5' version of what the code does (format as a markdown bulleted list)"
}
CRITICAL REQUIREMENT: Avoid using long paragraphs. You must present EVERY section entirely as concise bullet points using standard markdown format (* or -).
Do not return anything outside the JSON object. Do not include markdown codeblocks around the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [systemPrompt, code],
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from AI");
    }
    const result = JSON.parse(resultText);

    // Try saving to Supabase if authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("analyses").insert({
        user_id: user.id,
        code,
        language,
        explanation: result.explanation,
        bugs: result.bugs,
        improvements: result.improvements,
        complexity: result.complexity,
        simplified_explanation: result.simplified_explanation
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze code" },
      { status: 500 }
    );
  }
}
