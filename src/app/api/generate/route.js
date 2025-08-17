import { BuildTask } from "@/trigger/Builder";

export async function POST(request) {
  try {
    console.log("backend hit");
    const body = await request.json();
    const { prompt, userId, projectid } = body;

    if (!prompt || prompt.trim() === "") {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const result = await BuildTask.trigger({
      prompt,
      userId,
      projectid
    })

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error running agent:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
