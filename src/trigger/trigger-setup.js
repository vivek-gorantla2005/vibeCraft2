import { configure, runs } from "@trigger.dev/sdk/v3";

configure({
  secretKey: process.env["TRIGGER_SECRET_KEY"],
});

export default async function main() {
  const run = await runs.list({
    limit: 10,
    status: ["COMPLETED"],
  });
}

