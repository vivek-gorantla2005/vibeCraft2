import { GoogleGenAI } from "@google/genai";
import { createFile, createFileDeclaration } from "@/e2b/tools/createFile.js";
import { readFileFromSandbox, readFileFromSandboxDeclaration } from "@/e2b/tools/readFile.js";
import { executeCommand, executeCommandDeclaration } from "@/e2b/tools/execute.js";
import { sandboxSetup } from "@/e2b/start-sandbox.js";
import { prompt } from "./prompt.js";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBM7MN5kvV865Lf7Sy1WgxOiEovCjf7Cp8",
});

const users = {};

const availableTools = {
  createFile: createFile,
  executeCommand: executeCommand,
  readFileFromSandbox: readFileFromSandbox,
};

export async function runAgent(userProblem, userId, projectId) {
  const key = `${userId}_${projectId}`;

  // Create sandbox and agent history if this is the first request
  if (!users[key]) {
    const sandbox = (await sandboxSetup()).sandbox;
    users[key] = {
      History: [],
      sandbox: sandbox,
    };
  }

  const { History, sandbox } = users[key];

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

      const result = await funCall({ sandbox, ...args });

      const functionResponsePart = {
        name: name,
        response: { result: result },
      };

      History.push({
        role: "model",
        parts: [
          {
            functionCall: response.functionCalls[0],
          },
        ],
      });

      History.push({
        role: "model",
        parts: [
          {
            functionResponse: functionResponsePart,
          },
        ],
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

  return {
    message: "Agent completed successfully",
    sandboxUrl: `https://49999-${sandbox.sandboxId}.e2b.dev`,
  };
}
