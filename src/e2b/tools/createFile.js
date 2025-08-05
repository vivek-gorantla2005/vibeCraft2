import Sandbox from "@e2b/code-interpreter";
import { Type } from "@google/genai";

export const createFile = async ({ sandbox, filepath, content }) => {
  try {
    const cwd = await sandbox.commands.run('pwd');   
    const p = cwd.stdout.trim();
    console.log('Current working directory:', p);

    const currPath = `${p}/my-app/src`;           

    console.log(`Creating file at: ${currPath}/${filepath}`);
    const output = await sandbox.files.write(`${currPath}/${filepath}`, content);
    console.log('File created successfully:', output);
  } catch (err) {
    console.error("Error in sandbox function:", err);
  }
};


export const createFileDeclaration = {
    name: 'createFile',
    description: 'Creates a new file with the specified content inside the sandbox\'s /my-app/src directory.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            filepath: {
                type: Type.STRING,
                description: 'The path and name of the file to create, relative to the sandbox\'s /my-app/src directory. For example: \'pages/index.jsx\''
            },
            content: {
                type: Type.STRING,
                description: 'The content to be written into the new file. This is typically the source code for a file, like JSX for a React component.'
            }
        },
        required: ['filepath','content'],
    }
}
