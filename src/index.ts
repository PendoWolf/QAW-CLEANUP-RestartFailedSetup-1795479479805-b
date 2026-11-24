import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics for the Tripwise Assistant (Pendo agent "writeAssistantReply (QAW-CLEANUP-RestartFailedSetup-1795479479805-b)").
// Set PENDO_DISABLED=true in the environment to turn it off.
pendo.init({
  apiKey: "5f8e70fb-8c86-4533-a4f4-89a3ab69ac27",
  agentId: "kgPlOXgfXnwBTaqMMwp5VaQNkXQ",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Sends the Pendo events still buffered before the process exits.
async function stop(): Promise<void> {
  await pendo.shutdown();
  process.exit(0);
}
process.on("SIGINT", () => void stop());
process.on("SIGTERM", () => void stop());
