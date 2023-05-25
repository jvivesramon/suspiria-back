import { type Request, type Response } from "express";
import { pingController } from "./pingController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a pingController controller", () => {
  describe("When it receives a request", () => {
    const req = {};

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the response's method status with 200", () => {
      const status = 200;

      pingController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response's json status with 'pong 🏓' message", () => {
      const message = "pong 🏓";

      pingController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
