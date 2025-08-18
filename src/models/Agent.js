import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  userId: String,
  projectId: String,
  sandboxId: String,
  history: { type: Array, default: [] }
});

export default mongoose.models.Agent || mongoose.model("Agent", AgentSchema);
