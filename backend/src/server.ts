import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend API running on port ${PORT}`);
});

const shutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    console.log("HTTP server closed");

    await prisma.$disconnect();

    console.log("Database connection closed");

    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
