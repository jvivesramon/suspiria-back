import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {};

const res: Pick<Response, "status" | "json"> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const error = new CustomError(404, "Endpoint not found");

describe("Given a notFoundError middleware", () => {
  describe("When it is called", () => {
    test("Then it should call next function with a 404 status code and 'Endpoint not found' error message", () => {
      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it is called with an unknown error", () => {
    const generalServerError = new Error("General server error");

    test("Then it should call the response's method status with code 500", () => {
      const statusCode = 500;

      generalError(
        generalServerError as CustomError,
        req as Request,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with code error message", () => {
      const { message } = generalServerError;

      generalError(
        generalServerError as CustomError,
        req as Request,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });

  describe("When it is called with a status code 404 and 'Endpoint not found' error message", () => {
    test("Then it should call the response's method status with code 404", () => {
      const statusCode = 404;

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with 'Endpoint not found' error", () => {
      const { message } = error;

      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
