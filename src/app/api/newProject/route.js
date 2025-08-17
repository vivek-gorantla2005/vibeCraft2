import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const newProject = await Project.create({
            userId: body.userId,
            username: body.username,
            projectname: body.projectname,
            projectdescription: body.projectdescription,
        });
        return NextResponse.json({ success: true, project: newProject }, { status: 200 });
    } catch (err) {
         console.error("Error creating project:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }   
}