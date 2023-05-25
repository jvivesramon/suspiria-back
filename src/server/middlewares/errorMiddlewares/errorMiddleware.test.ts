import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "./errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const next = jest.fn();

  const req = {};

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it is called with an unknown error", () => {
    const error = new Error("General server error");

    test("Then it should call the response's method status with code 500", () => {
      const statusCode = 500;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with code error message", () => {
      const { message } = error;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });

  describe("When it is called with a status code 404 and 'Endpoint not found' error message", () => {
    test("Then it should call the response's method status with code 404", () => {
      const statusCode = 404;
      const error = new CustomError(404, "Endpoint not found");

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with 'Endpoint not found' error", () => {
      const error = new CustomError(404, "Endpoint not found");

      const { message } = error;

      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
