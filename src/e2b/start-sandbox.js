import { Sandbox } from '@e2b/code-interpreter';

export async function sandboxSetup() {
  try {
    const sbx = await Sandbox.create("vibeCraft20");

    console.log(`Server is running at: https://49999-${sbx.sandboxId}.e2b.dev`);

    return {
      sandbox : sbx,
      sandboxId: sbx.sandboxId,
      url: `https://49999-${sbx.sandboxId}.e2b.dev`,
    };
  } catch (error) {
    console.error('Sandbox creation failed:', error);
    throw error;
  }
}
