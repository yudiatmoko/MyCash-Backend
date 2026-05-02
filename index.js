import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cron from "node-cron";
import prisma from "./config/prisma.js";

dotenv.config();
const app = express();
const port = process.env.APP_PORT;

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

app.listen(port, () => {
  prisma.$connect()
    .then(() => {
      console.log("Prisma Database connection success");
      console.log(`Running at ${port}`);
    })
    .catch((err) => console.log("Database connection failed", err));
});
