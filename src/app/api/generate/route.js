// app/api/runAgent/route.js
import { runAgent } from "@/LLM/gemini";

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400 }
      );
    }

    const result = await runAgent(prompt);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error running agent:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
