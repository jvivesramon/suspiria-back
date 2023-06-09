import { Schema, Types, model } from "mongoose";

const suspiriaItem = new Schema(
  {
    pictureData: {
      title: { type: String, required: true },
      creationDate: String,
      author: String,
      movement: String,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    temperatureColor: {
      warm: Boolean,
      cold: Boolean,
      mixed: Boolean,
    },
    colors: {
      colorFirst: {
        type: String,
        required: true,
      },
      colorSecond: {
        type: String,
        required: true,
      },
      colorThird: {
        type: String,
        required: true,
      },
      colorFourth: String,
      colorFive: String,
      colorSixth: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

const Suspiria = model("Suspiria", suspiriaItem, "pictures");

export default Suspiria;
