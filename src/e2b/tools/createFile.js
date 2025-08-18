import Sandbox from "@e2b/code-interpreter";
import { Type } from "@google/genai";
import { client } from "@/s3/s3setup";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const createFile = async ({projectId, sandboxId, filepath, content}) => {
  try {
    const sandbox = await Sandbox.connect(sandboxId);
    const cwd = await sandbox.commands.run('pwd');   
    const p = cwd.stdout.trim();
    console.log('Current working directory:', p);

    const currPath = `${p}/my-app/src`;           

    console.log(`Creating file at: ${currPath}/${filepath}`);
    const output = await sandbox.files.write(`${currPath}/${filepath}`, content);
    console.log('File created successfully:', output);
    
    //adding file to s3 bucket
    const s3Key = `builds/${projectId}/${filepath}`.replace(/\\/g, "/");
    const command = new PutObjectCommand({
      Bucket:"user-projects",
      Key:s3Key,
      Body:getContentType(content)
    })

    const res = await client.send(command);
    console.log("file saved to s3 storage",res);


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

function getContentType(filepath) {
  const ext = filepath.split('.').pop().toLowerCase();
  const contentTypes = {
    'js': 'application/javascript',
    'jsx': 'application/javascript',
    'ts': 'application/typescript',
    'tsx': 'application/typescript',
    'css': 'text/css',
    'html': 'text/html',
    'json': 'application/json',
    'md': 'text/markdown',
    'txt': 'text/plain'
  };
  return contentTypes[ext] || 'text/plain';
}