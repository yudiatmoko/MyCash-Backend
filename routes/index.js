import express from "express";
import user from "./userRoutes.js";
import outlet from "./outletRoutes.js";
import category from "./categoryRoutes.js";
import product from "./productRoutes.js";
import session from "./sessionRoutes.js";
import transaction from "./transactionRoute.js";

const app = express();

app.use("/user", user);
app.use("/outlet", outlet);
app.use("/category", category);
app.use("/product", product);
app.use("/session", session);
app.use("/session", session);
app.use("/transaction", transaction);

export default app;
