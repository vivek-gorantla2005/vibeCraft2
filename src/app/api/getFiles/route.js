import { Sandbox } from "@e2b/code-interpreter";
import getFiles from "@/e2b/getAllFiles";

export async function GET(req) {
  try {
    
    const { searchParams } = new URL(req.url);
    const sandboxId = searchParams.get("sandboxId");

    if (!sandboxId) {
      return new Response(
        JSON.stringify({ error: "sandboxId is required" }),
        { status: 400 }
      );
    }

    const sandbox = await Sandbox.connect(sandboxId);

    // get working directory inside sandbox
    const cwd = "/home/user/my-app"
    // await sandbox.commands.run("pwd");
    // const workingDir = cwd.stdout.trim();
    console.log("getting files!!")
    const result = await getFiles(sandbox, cwd);
    console.log(result);

    return new Response(
      JSON.stringify({
        message: "files fetched success!",
        result,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: "Server error, cannot get files from sandbox",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
