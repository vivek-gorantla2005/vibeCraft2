import { Type } from "@google/genai";
export const readFileFromSandbox = async ({ sandbox, filePath }) => {
  try {
    console.log(`Connected to sandbox with ID: ${sandbox.sandboxId}`);

    const fullPath = `/home/user/my-app/${filePath}`;

    console.log(`Reading file from: ${fullPath}`);
    const fileContent = await sandbox.files.read(fullPath);

    console.log('File content:\n', fileContent);

    return fileContent;

  } catch (err) {
    console.error("Error reading file from sandbox:", err.message || err);
  }
};

export const readFileFromSandboxDeclaration = {
  name: 'readFileFromSandbox',
  description: 'Read the contents of a file from the /home/user/my-app directory in the sandbox.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: 'The relative file path from /my-app, e.g., "src/pages/index.jsx".'
      }
    },
    required: ['filePath']
  }
};
