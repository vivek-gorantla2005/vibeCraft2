import { inngest } from "./client";
import { sandboxSetup } from "../e2b/start-sandbox";

export const startSandbox = inngest.createFunction(
  { id: "start-sandbox" },
  { event: "build/sandbox" },
  async ({ event, step }) => {
    const result = await step.run("start sandbox", async () => {
      return await sandboxSetup();
    });

    console.log("Sandbox started:", result);

    return {
      message: "Sandbox started successfully!",
      sandbox: result,
    };
  }
);
