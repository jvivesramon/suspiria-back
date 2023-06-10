import { Joi } from "express-validation";
import { type PictureCardBodyStructure } from "../../types";

const pictureSchema = {
  body: Joi.object({
    picture: Joi.object<PictureCardBodyStructure>({
      image: Joi.string().required(),
      pictureData: Joi.object({
        title: Joi.string().required(),
        creationDate: Joi.string().required(),
        author: Joi.string().required(),
        movement: Joi.string().required(),
      }),
      description: Joi.string().required(),
      colors: Joi.object({
        colorFirst: Joi.string().required(),
        colorSecond: Joi.string().required(),
        colorThird: Joi.string().required(),
        colorFourth: Joi.string(),
        colorFifth: Joi.string(),
        colorSixth: Joi.string(),
      }),
      temperatureColor: Joi.object({
        warm: Joi.boolean(),
        cold: Joi.boolean(),
        mixed: Joi.boolean(),
      }),
      user: Joi.string(),
    }),
  }),
};

export default pictureSchema;
