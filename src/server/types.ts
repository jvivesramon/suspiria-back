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

export interface CustomRequestAddPicture extends CustomRequest {
  body: {
    picture: PictureCardBodyStructure;
  };
}

export type CustomRequestHeader = Pick<CustomRequest, "header" | "userId">;

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface LimitPicturesRequest extends Request {
  query: {
    skip: string;
    limit: string;
  };
}
export interface CustomRequestParams extends CustomRequest {
  params: {
    pictureId: string;
  };
}

export interface PictureCardBodyStructure {
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
    colorFifth: string;
    colorSixth: string;
  };
  user: Types.ObjectId | string;
}

export interface PictureCardStructure extends PictureCardBodyStructure {
  id: string;
}

export interface PictureCardListStructure {
  pictures: PictureCardStructure[];
}
