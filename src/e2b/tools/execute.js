import { Sandbox } from '@e2b/code-interpreter';
import { Type } from '@google/genai';

export const executeCommand = async ({projectId,sandboxId, command }) => {
  try {
    const sandbox = await Sandbox.connect(sandboxId);
    const projectPath = `/home/user/my-app`;

    console.log(`Executing command in ${projectPath}: ${command}`);
    const output = await sandbox.commands.run(command, { cwd: projectPath });

    console.log('Command output:\n', output.stdout.trim());

    if (output.stderr) {
      console.warn('Command stderr:\n', output.stderr.trim());
    }

  } catch (err) {
    console.error("Error in sandbox command execution:", err.message || err);
  }
};


export const executeCommandDeclaration = {
  name: 'executeCommand',
  description: 'Execute a shell command inside the sandbox terminal in the /home/user/my-app directory.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      command: {
        type: Type.STRING,
        description: 'The shell command to run, e.g., "npm install" or "ls -la".'
      }
    },
    required: ['command'],
  }
};
