import { type UserUniqueCredentials, type UserCredentials } from "../types.js";

export const userData: UserCredentials = {
  name: "Michael",
  username: "Michael",
  password: "thatswhatshesaid",
};

export const userDataCredentisals: UserUniqueCredentials = {
  ...userData,
  _id: "1",
};
