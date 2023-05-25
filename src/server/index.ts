import "..loadEnviroment.js";
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.disable("x-powered-by");

export default app;
