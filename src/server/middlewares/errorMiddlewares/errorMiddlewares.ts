import "../../../loadEnviroment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("suspiria-api:server:middlewares:errorMiddlewares:");

export const notFoundError = (
  _res: Request,
  _req: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.redBright(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General server error";

  res.status(statusCode).json({ message });
};
