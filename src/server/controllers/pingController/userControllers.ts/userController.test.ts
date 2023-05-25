import { type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type UserCredentialsRequest } from "../../../types.js";
import loginController from "./userControllers.js";
import User from "../../../../database/models/User.js";
import { userData, userDataCredentisals } from "../../../mocks/userMocks.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUserController", () => {
  const token = { token: "token" };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: userData,
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(userDataCredentisals),
  });

  jwt.sign = jest.fn().mockReturnValue(token);

  describe("When it receives a request with valid user credentials", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = 200;

      await loginController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a 'token'", async () => {
      await loginController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with wrongs credentials", () => {
    test("Then it should call the next function with 404 status and a 'Wrong credentials' error", async () => {
      const error = new CustomError(404, "Wrong credentials");

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
