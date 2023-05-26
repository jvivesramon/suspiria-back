import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface WrongUserCredentials {
  name: string;
  word: string;
}
export interface UserUniqueCredentials extends UserCredentials {
  _id: string;
}

export interface UserDbCredentials extends UserCredentials {
  _id: Types.ObjectId;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
