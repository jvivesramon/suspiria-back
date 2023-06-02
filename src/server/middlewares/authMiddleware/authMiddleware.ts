import "../../../loadEnviroment.js";
import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import { type CustomRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";

const authMiddleware = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        statusCode.unauthorized,
        errorMessages.missingToken
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const { sub: id } = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = id as string;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(statusCode.unauthorized, errorMessages.invalidToken)
        : error;

    next(customError);
  }
};

export default authMiddleware;
