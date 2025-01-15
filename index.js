import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", router);

cron.schedule("* * * * *", async () => {
  const now = new Date();
  await prisma.otp.deleteMany({
    where: {
      expiresAt: {
        lte: now,
      },
    },
  });
});

app.listen(port, async () => {
  await testConnection();
  console.log(`Running at ${port}`);
});
