import "../loadEnviroment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { pingController } from "./controllers/pingController/pingController.js";
import path from "./paths/paths.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(corsOptions));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(path.pingController, pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
