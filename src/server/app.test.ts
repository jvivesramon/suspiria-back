import request from "supertest";
import app from "./app";
import { statusCode } from "./utils/responseData/responseData";
import path from "./utils/paths/paths.js";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("The it should reply with a status code 200 and a 'pong 🏓' message", async () => {
      const message = "pong 🏓";

      const response = await request(app)
        .get(path.pingController)
        .expect(statusCode.ok);

      expect(response.body).toStrictEqual({ message });
    });
  });
});
