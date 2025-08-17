import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
      });
    }

    const projects = await Project.find({ userId }).lean();
    return new Response(JSON.stringify({ projects }), { status: 200 });
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
