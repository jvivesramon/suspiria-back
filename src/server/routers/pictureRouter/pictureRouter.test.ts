import "../../../loadEnviroments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import connectToDatabase from "../../../database/connectDatabase.js";
import Suspiria from "../../../database/models/Suspiria.js";
import User from "../../../database/models/User.js";
import { pictureCardMock } from "../../../mocks/pictureCardMocks.js";
import { adminMock, tokenMock } from "../../../mocks/userMocks.js";
import path from "../../utils/paths/paths.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { type PictureCardStructure } from "../../types.js";

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
  await Suspiria.deleteMany();
});

describe("Given a GET '/pictures' endpoint", () => {
  beforeAll(async () => {
    await User.create(adminMock);
    await Suspiria.create(pictureCardMock);
  });
  describe("When it receives a request with an authorized header", () => {
    test("Then it should responde with a 200 statuscode and a list of pictures", async () => {
      const response: { body: PictureCardStructure[] } = await request(app)
        .get(path.login)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCode.ok);

      expect(response.body).toHaveLength(2);
    });
  });
  describe("When it receives a request with an invalid token", () => {
    test("Then it should reject with status code 401 and a error message ''", async () => {
      const response: Response = await request(app)
        .get(path.login)
        .expect(statusCode.unauthorized);

      expect(response.body.message).toBe(errorMessages.missingToken);
    });
  });
});
