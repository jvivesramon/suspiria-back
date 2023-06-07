import { type NextFunction, type Request, type Response } from "express";
import Suspiria from "../../../database/models/Suspiria.js";
import { pictureCardMock } from "../../../mocks/pictureCardMocks.js";
import { deletePicture, getPictures } from "./picturesController.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { Types } from "mongoose";

beforeEach(() => {
  jest.clearAllMocks();
});

interface CustomRequest extends Request {
  userId: string;
}

export interface CustomRequestParams extends CustomRequest {
  params: {
    pictureId: string;
  };
}

describe("Given a getPictureCard controllers", () => {
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

      await getPictures(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of picture cards", async () => {
      const expectedPictures = { pictures: pictureCardMock };

      await getPictures(req as Request, res as Response, next as NextFunction);

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

      await getPictures(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

const idPicture = new Types.ObjectId().toString();
const idUser = new Types.ObjectId().toString();

describe("Given a deletePicture controller", () => {
  const req: Partial<CustomRequest> = {
    params: {
      idPicture,
    },
    userId: idUser,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with an picture id a response and a next function", () => {
    test("Then it should call status response's method with status code '200' and json method with message 'Picture succesfully deleted'", async () => {
      const expectedMessage = "Picture succesfully deleted";

      Suspiria.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(idPicture),
      });

      Suspiria.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(pictureCardMock),
      });

      await deletePicture(req as CustomRequestParams, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode.ok);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with a non-existing picture id, a response and next function", () => {
    test("Then it should call status response method with status code 404 and json method with message 'No picture found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "No pictures found";

      Suspiria.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deletePicture(req as CustomRequestParams, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When the request fails", () => {
    test("Then it should call the next function with the 'No id found in your request' error message", async () => {
      const expectedError = new Error("No id found in your request");

      Suspiria.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deletePicture(req as CustomRequestParams, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
