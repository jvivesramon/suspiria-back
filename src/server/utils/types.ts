export interface PathStructure {
  pingController: string;
  user: string;
  login: string;
}

export interface StatusCodeStructure {
  ok: 200;
  unauthorized: 401;
  notFound: 404;
  internalServerError: 500;
}

export interface ErrorMessagesStructure {
  invalidCredentials: string;
  endpointNotFound: string;
  generalError: string;
}
