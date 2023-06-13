import "../../../loadEnviroment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import connectToDatabase from "../../../database/connectDatabase.js";
import Suspiria from "../../../database/models/Suspiria.js";
import { tokenMock } from "../../../mocks/userMocks.js";
import path from "../../utils/paths/paths.js";
import {
  errorMessages,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { type PictureCardListStructure } from "../../types.js";
import {
  newPictureMock,
  pictureCardMock,
} from "../../../mocks/pictureCardMocks.js";

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

describe("Given a DELETE '/pictures/:pictureId' endpoint", () => {
  describe("When it receives a request with a valid id in its params", () => {
    beforeEach(async () => {
      await Suspiria.create(pictureCardMock);
    });

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

describe("Given a POST '/' endpoint", () => {
  describe("When it receives a request with a picture", () => {
    test("Then it should call the response's method status with 200 and the json method with the new picture created", async () => {
      const expectedStatus = 200;
      const expectedPicture = { picture: { ...newPictureMock, user: "1" } };

      const response = await request(app)
        .post(path.pictures)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(expectedPicture)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("picture");
    });
  });
});

describe("Given a GET '/pictures/:pictureId' endpoint", () => {
  beforeAll(async () => {
    await Suspiria.create(pictureCardMock);
  });

  describe("When it receives a request with a valid picture id", () => {
    test("Then it should call the response's method status with 200 and the json method with the picture selected", async () => {
      const statusCodeExpected = 200;
      const expectedProperty = "picture";

      const picture = await Suspiria.find().exec();

      const response = await request(app)
        .get(`/pictures/${picture[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeExpected);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });
});
