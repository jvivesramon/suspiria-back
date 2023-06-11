import { type NextFunction, type Request, type Response } from "express";
import Suspiria from "../../../database/models/Suspiria.js";
import {
  newPictureMock,
  pictureCardMock,
} from "../../../mocks/pictureCardMocks.js";
import {
  addPicture,
  deletePicture,
  getPictures,
} from "./picturesController.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { Types } from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import {
  type LimitPicturesRequest,
  type CustomRequestParams,
} from "../../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

interface CustomRequest extends Request {
  userId: string;
}

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a getPictureCard controllers", () => {
  const req: Partial<LimitPicturesRequest> = {
    query: {
      skip: "2",
      limit: "10",
      filter: "warm",
    },
  };

  describe("When it receives a request", () => {
    Suspiria.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockResolvedValue(1),
    });

    Suspiria.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(pictureCardMock),
          }),
        }),
      }),
    });

    test("Then it should call the response's method status 200", async () => {
      const expectedStatus = statusCode.ok;

      await getPictures(
        req as LimitPicturesRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of picture cards", async () => {
      const expectedPictures = { pictures: pictureCardMock, totalPictures: 1 };

      await getPictures(
        req as LimitPicturesRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedPictures);
    });
  });

  describe("When it rejects", () => {
    test("Then it should call the next function with the error 'General server error'", async () => {
      const error = errorMessages.generalError;

      Suspiria.where = jest.fn().mockReturnValue({
        countDocuments: jest.fn().mockResolvedValue(1),
      });

      Suspiria.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockRejectedValue(error),
            }),
          }),
        }),
      });

      await getPictures(
        req as LimitPicturesRequest,
        res as Response,
        next as NextFunction
      );

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

  describe("When it receives a request with a picture id a response and a next function", () => {
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
    test("Then it should call next with status code 404 and json method with message 'No picture found'", async () => {
      const expectedError = new CustomError(404, "No pictures found");

      Suspiria.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deletePicture(req as CustomRequestParams, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
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

describe("Given a addPicture controller", () => {
  const user = new Types.ObjectId().toString();

  const req: Partial<CustomRequest> = {
    userId: user,
    body: { picture: newPictureMock },
  };

  describe("When it receives a request with a picture and a user id a response and a next function", () => {
    test("Then it should call the response's methos status 200 and the method json with the picture", async () => {
      const status = 200;

      Suspiria.create = jest.fn().mockResolvedValue(newPictureMock);

      await addPicture(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ picture: newPictureMock });
    });
  });

  describe("When it receives a request with a non-existing id and picture a response and a next function", () => {
    test("Then it should call next with a status 404 and a 'No picture or user found' error message", async () => {
      const status = 404;
      const expectedError = "No picture or user found";
      const error = new CustomError(status, expectedError);

      const req: Partial<CustomRequest> = {
        userId: undefined,
        body: { picture: undefined },
      };

      await addPicture(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
