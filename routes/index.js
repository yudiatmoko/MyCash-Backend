import express from "express";
import user from './userRoutes.js';

const app = express();

app.use('/user', user);

export default app;