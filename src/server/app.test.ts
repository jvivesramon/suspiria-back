import request from "supertest";
import app from "./app";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("The it should reply with a status code 200 and a 'pong 🏓' message", async () => {
      const expectedStatus = 200;
      const message = "pong 🏓";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message });
    });
  });
});
