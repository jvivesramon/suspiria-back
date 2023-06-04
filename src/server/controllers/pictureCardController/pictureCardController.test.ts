import { type NextFunction, type Request, type Response } from "express";
import Suspiria from "../../../database/models/Suspiria.js";
import { pictureCardMock } from "../../../mocks/pictureCardMocks.js";
import getPictureCard from "./pictureCardController.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a pictureCardController controllers", () => {
  const req = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    Suspiria.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(pictureCardMock),
    });

    test("Then it should call the response's method status 200", async () => {
      const expectedStatus = statusCode.ok;

      await getPictureCard(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of picture cards", async () => {
      const expectedPictures = { pictures: pictureCardMock };

      await getPictureCard(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedPictures);
    });
  });

  describe("When it rejects", () => {
    test("Then it should call the next function with the error 'General server error'", async () => {
      const error = errorMessages.generalError;

      Suspiria.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getPictureCard(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
