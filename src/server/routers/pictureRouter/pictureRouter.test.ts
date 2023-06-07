import "../../../loadEnviroment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import connectToDatabase from "../../../database/connectDatabase.js";
import Suspiria from "../../../database/models/Suspiria.js";
import User from "../../../database/models/User.js";
import { adminMock, tokenMock } from "../../../mocks/userMocks.js";
import path from "../../utils/paths/paths.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { type PictureCardListStructure } from "../../types.js";
import { pictureCardMock } from "../../../mocks/pictureCardMocks.js";

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
  await User.deleteMany();
});

describe("Given a GET '/pictures' endpoint", () => {
  beforeAll(async () => {
    await User.create(adminMock);
    await Suspiria.create(pictureCardMock);
  });
  describe("When it receives a request with an authorized header", () => {
    test("Then it should responde with a 200 statuscode and a list of pictures", async () => {
      const response: { body: PictureCardListStructure } = await request(app)
        .get(path.pictures)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCode.ok);

      expect(response.body.pictures).toHaveLength(1);
    });
  });
  describe("When it receives a request with an invalid token", () => {
    test("Then it should reject with status code 401 and a error message ''", async () => {
      const response: Response = await request(app)
        .get(path.pictures)
        .expect(statusCode.unauthorized);

      expect(response.body.message).toBe(errorMessages.missingToken);
    });
  });
});

describe("Given a GET '/pictures/:pictureId' endpoint", () => {
  beforeAll(async () => {
    await Suspiria.create(pictureCardMock);
  });

  describe("When it receives a request with a valid id in its params", () => {
    test("Then it should respond a status 200 and message 'Picture succesfully deleted'", async () => {
      const statusCodeExpected = 200;
      const expectedMessage = "Picture succesfully deleted";

      const pictures = await Suspiria.find().exec();

      const response = await request(app)
        .delete(`/pictures/${pictures[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeExpected);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
