import { serve } from "inngest/next";
import {inngest} from "@/inngest/client.js"
import { startSandbox } from "@/inngest/functions";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    startSandbox
  ],
});