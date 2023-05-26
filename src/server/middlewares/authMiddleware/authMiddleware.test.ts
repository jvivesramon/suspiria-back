import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "./authMiddleware";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an authMiddleware middleware", () => {
  const token = "token";
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${token}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the next function received", () => {
      jwt.verify = jest.fn();

      authMiddleware(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token and a next function", () => {
    test("Then it should call the next function with a 401 'Invalid token' error", () => {
      const expectedError = new CustomError(
        statusCode.unauthorized,
        errorMessages.invalidToken
      );

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      authMiddleware(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an authorization header without bearer and a next function", () => {
    test("Then it should call the received next function with a 401 'Missing token' error", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(token),
      };

      const expectedError = new CustomError(
        statusCode.unauthorized,
        errorMessages.missingToken
      );

      authMiddleware(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
