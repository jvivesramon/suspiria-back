import "../../../loadEnviroment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("suspiria-api:server:middlewares:errorMiddlewares:");

export const notFoundError = (
  _res: Request,
  _req: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    statusCode.notFound,
    errorMessages.endpointNotFound
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrorMessage = error.details.body
      ?.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll('"', "");

    (error as CustomError).publicMessage = validationErrorMessage;
    debug(chalk.redBright(validationErrorMessage));
  }

  debug(chalk.redBright(error.message));

  const statusCodeError = error.statusCode || statusCode.internalServerError;
  const message = error.statusCode ? error.message : errorMessages.generalError;

  res.status(statusCodeError).json({ message });
};
