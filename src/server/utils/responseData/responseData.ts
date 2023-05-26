import {
  type ErrorMessagesStructure,
  type StatusCodeStructure,
} from "../types";

export const statusCode: StatusCodeStructure = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

export const errorMessages: ErrorMessagesStructure = {
  invalidCredentials: "Wrong credentials",
  endpointNotFound: "Endpoint not found",
  generalError: "General server error",
  validationFailed: "Validation Failed",
};
