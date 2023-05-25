import "..loadEnviroment.js";
import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";

const debug = createDebug("suspiria-api:server:middlewares:errorMiddlewares:");

export const generalError = (
  error: CustomError,
  res: Response,
  _req: Request,
  _next: NextFunction
) => {
  debug(chalk.redBright(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General server error";

  res.status(statusCode).json(message);
};
