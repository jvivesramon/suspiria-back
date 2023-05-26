import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../database/connectDatabase";
import mongoose from "mongoose";
import request, { type Response } from "supertest";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import {
  userData,
  userDbConnection,
  wrongUserData,
} from "../../mocks/userMocks";
import { type UserDbCredentials } from "../types";
import { errorMessages, statusCode } from "../utils/responseData/responseData";
import path from "../utils/paths/paths";
import app from "../app";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/user/login'", () => {
  let newUser: UserDbCredentials;

  beforeAll(async () => {
    newUser = await User.create(userDbConnection);
  });

  describe("When it receives a request with valid user credentials", () => {
    test("Then it should reply with a response with 200 status and a token", async () => {
      const expectedStatus = statusCode.ok;

      const response: { body: { token: string } } = await request(app)
        .post(`${path.user}${path.login}`)
        .send(userData)
        .expect(expectedStatus);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);
      const userId = payload.sub;

      expect(userId).toBe(newUser._id.toString());
    });
  });

  describe("When it receives a request with unvalid user credentials", () => {
    test("Then it should reply with a response with 401 status and a 'Validation Failed' error message", async () => {
      const expectedStatus = statusCode.badRequest;
      const errorMessage = errorMessages.validationFailed;

      const response: Response = await request(app)
        .post(`${path.user}${path.login}`)
        .send(wrongUserData)
        .expect(expectedStatus);

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(errorMessage);
    });
  });
});
