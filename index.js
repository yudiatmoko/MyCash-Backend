import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
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
