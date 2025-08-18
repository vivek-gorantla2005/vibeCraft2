import { GoogleGenAI } from "@google/genai";
import { createFile, createFileDeclaration } from "@/e2b/tools/createFile.js";
import { readFileFromSandbox, readFileFromSandboxDeclaration } from "@/e2b/tools/readFile.js";
import { executeCommand, executeCommandDeclaration } from "@/e2b/tools/execute.js";
import { sandboxSetup } from "@/e2b/start-sandbox.js";
import { prompt } from "./prompt.js";
import connectDB from "@/lib/mongodb.js";
import Agent from "@/models/Agent.js";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBM7MN5kvV865Lf7Sy1WgxOiEovCjf7Cp8",
});

const availableTools = {
  createFile,
  executeCommand,
  readFileFromSandbox,
};

export async function runAgent(userProblem, userId, projectId) {
  await connectDB();

  let agent = await Agent.findOne({ userId, projectId });

  // Create sandbox and agent history if this is the first request
  if (!agent) {
    const sandbox = (await sandboxSetup()).sandbox;
    agent = await Agent.create({
      userId,
      projectId,
      sandboxId: sandbox.sandboxId,
      history: [],
    });
  }

  // ensure history is an array and mutable
  const History = Array.isArray(agent.history) ? agent.history : [];

  // sandboxId as string
  const sandboxId = agent.sandboxId;

  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: {
        systemInstruction: prompt,
        tools: [
          {
            functionDeclarations: [
              createFileDeclaration,
              executeCommandDeclaration,
              readFileFromSandboxDeclaration,
            ],
          },
        ],
      },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      console.log(response.functionCalls[0]);

      const { name, args } = response.functionCalls[0];
      const funCall = availableTools[name];

      if (!funCall) {
        console.error("Unknown tool requested:", name);
        History.push({
          role: "model",
          parts: [{ functionCall: response.functionCalls[0] }],
        });
        break;
      }

      // call tool with sandboxId string and other args
      let result;
      try {
        result = await funCall({projectId,sandboxId, ...args });
      } catch (err) {
        console.error(`Tool ${name} threw:`, err);
        result = { error: String(err) };
      }

      const functionResponsePart = {
        name,
        response: { result },
      };

      History.push({
        role: "model",
        parts: [{ functionCall: response.functionCalls[0] }],
      });

      History.push({
        role: "model",
        parts: [{ functionResponse: functionResponsePart }],
      });
    } else {
      History.push({
        role: "model",
        parts: [{ text: response.text }],
      });

      console.log(response.text);
      break;
    }
  }

  // persist updated history back to DB
  agent.history = History;
  await agent.save();

  // Return using agent.sandboxId (no undefined sandbox variable)
  return {
    message: "Agent completed successfully",
    sandboxUrl: `https://49999-${agent.sandboxId}.e2b.dev`,
  };
}
