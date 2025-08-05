import { GoogleGenAI } from "@google/genai";
import { createFile,createFileDeclaration } from "@/e2b/tools/createFile.js";
import { readFileFromSandbox,readFileFromSandboxDeclaration } from "@/e2b/tools/readFile.js"
import { executeCommand,executeCommandDeclaration } from "@/e2b/tools/execute.js";
import { sandboxSetup } from "@/e2b/start-sandbox.js";
import { prompt } from "./prompt.js";


const History = [];
const ai = new GoogleGenAI({ apiKey: "AIzaSyBM7MN5kvV865Lf7Sy1WgxOiEovCjf7Cp8" });

let sandbox = undefined;

const availableTools = {
    createFile:createFile,
    executeCommand:executeCommand,
    readFileFromSandbox:readFileFromSandbox
}



export async function runAgent(userProblem) {

  sandbox = (await sandboxSetup()).sandbox;

    History.push({
        role:'user',
        parts:[{text:userProblem}]
    });

   
    while(true){
    
   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History,
    config: {
        systemInstruction:prompt,
    tools: [{
      functionDeclarations: [createFileDeclaration,executeCommandDeclaration,readFileFromSandboxDeclaration]
    }],
    },
   });


   if(response.functionCalls&&response.functionCalls.length>0){
    
    console.log(response.functionCalls[0]);
    const {name,args} = response.functionCalls[0];

    const funCall =  availableTools[name];
    const result = await funCall({sandbox,...args});

    const functionResponsePart = {
      name: name,
      response: {
        result: result,
      },
    };
   
    // model 
    History.push({
      role: "model",
      parts: [
        {
          functionCall: response.functionCalls[0],
        },
      ],
    });

    History.push({
      role: 'model',
      parts: [
        {
          functionResponse: functionResponsePart,
        },
      ],
    });
   }
   else{

    History.push({
        role:'model',
        parts:[{text:response.text}]
    })
    console.log(response.text);
    break;
   }
  }
      return {
        message: "Agent completed successfully",
        sandboxUrl: `https://49999-${sandbox.sandboxId}.e2b.dev`,
      };
}


// async function main() {
//     sandbox = (await sandboxSetup()).sandbox;
//     while(true){

//       const userProblem = readlineSync.question("Ask me anything--> ");
//       await runAgent(userProblem);
//     }
// }


// main();





