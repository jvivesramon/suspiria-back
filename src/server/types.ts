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

export interface CustomRequest extends Request {
  userId: string;
}

export type CustomRequestHeader = Pick<CustomRequest, "header" | "userId">;

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface PictureCardStructure {
  id: string;
  pictureData: {
    title: string;
    creationDate: string;
    author: string;
    movement: string;
  };
  image: string;
  description: string;
  temperatureColor: {
    warm: boolean;
    cold: boolean;
    mixed: boolean;
  };
  colors: {
    colorFirst: string;
    colorSecond: string;
    colorThird: string;
    colorFourth: string;
    colorFive: string;
    colorSixth: string;
  };
  user: Types.ObjectId;
}

export interface PictureCardListStructure {
  pictures: PictureCardStructure[];
}
