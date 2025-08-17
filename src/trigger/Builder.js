import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { runAgent } from "@/LLM/gemini";

export const BuildTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload, { ctx }) => {
    logger.log("Task started", { payload, ctx });

    // Call your LLM agent
    const result = await runAgent(payload.prompt, payload.userId, payload.projectid);

    // Optional wait
    await wait.for({ seconds: 5 });

    return {
      message: "code generated!",
      llmResult: result
    };
  },
});
