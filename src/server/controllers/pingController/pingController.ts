import { type NextFunction, type Request, type Response } from "express";
import { statusCode } from "../../utils/responseData/responseData.js";

export const pingController = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(statusCode.ok).json({ message: "pong 🏓" });
};
