import { type NextFunction, type Request, type Response } from "express";

export const pingController = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ message: "pong 🏓" });
};
