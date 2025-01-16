import express from "express";
import user from "./userRoutes.js";
import outlet from "./outletRoutes.js";
import category from "./categoryRoutes.js";

const app = express();

app.use("/user", user);
app.use("/outlet", outlet);
app.use("/category", category);

export default app;
