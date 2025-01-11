import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { testConnection } from "./database/db.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(port, async () => {
  await testConnection();
  console.log(`Running at ${port}`);
});
