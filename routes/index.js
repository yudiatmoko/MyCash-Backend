import express from "express";
import user from "./userRoutes.js";
import outlet from "./outletRoutes.js";
import category from "./categoryRoutes.js";
import product from "./productRoutes.js";

const app = express();

app.use("/user", user);
app.use("/outlet", outlet);
app.use("/category", category);
app.use("/product", product);

export default app;
