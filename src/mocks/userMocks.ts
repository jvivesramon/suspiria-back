import {
  type UserUniqueCredentials,
  type UserCredentials,
} from "../server/types.js";

export const userData: UserCredentials = {
  username: "Michael",
  password: "thatswhatshesaid",
};

export const userDataCredentisals: UserUniqueCredentials = {
  ...userData,
  _id: "1",
};
