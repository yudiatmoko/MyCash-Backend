import express from "express";
import user from "./userRoutes.js";
import outlet from "./outletRoutes.js";

const app = express();

app.use("/user", user);
app.use("/outlet", outlet);

export default app;
