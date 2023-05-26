import { Types } from "mongoose";
import {
  type UserUniqueCredentials,
  type UserCredentials,
  type UserDbCredentials,
  type WrongUserCredentials,
} from "../server/types.js";

export const userData: UserCredentials = {
  username: "Michael",
  password: "thatswhatshesaid",
};

export const wrongUserData: WrongUserCredentials = {
  name: "Michael",
  word: "thatswhatshesaid",
};

export const userDataCredentisals: UserUniqueCredentials = {
  ...userData,
  _id: "1",
};

export const userDbConnection: UserDbCredentials = {
  ...userData,
  password: "$2y$10$leaZ3FphiQQcWnNB39UeL.uryTho4EJipGQb2uwNpUmw3uwQb0e8.",
  _id: new Types.ObjectId(),
};
