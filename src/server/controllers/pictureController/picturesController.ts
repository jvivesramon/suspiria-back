import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import Suspiria from "../../../database/models/Suspiria.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  type CustomRequestParams,
  type CustomRequestAddPicture,
} from "../../types.js";
import { statusCode } from "../../utils/responseData/responseData.js";
import { Types } from "mongoose";

const debug = createDebug(
  "suspiria-api:src:server:controller:pictureCardController:"
);

export const getPictures = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pictures = await Suspiria.find().limit(10).exec();
    res.status(200).json({ pictures });
  } catch (error) {
    debug(chalk.bgMagenta(error.message));

    next(error);
  }
};

export const deletePicture = async (
  req: CustomRequestParams,
  res: Response,
  next: NextFunction
) => {
  const { pictureId } = req.params;
  try {
    const picturePosition = await Suspiria.findById(pictureId).exec();

    if (!picturePosition) {
      throw new CustomError(404, "No pictures found");
    }

    await Suspiria.findByIdAndDelete(pictureId).exec();

    res.status(200).json({ message: "Picture succesfully deleted" });
  } catch (error) {
    debug(chalk.bgMagenta(error.message));

    next(error);
  }
};

export const addPicture = async (
  req: CustomRequestAddPicture,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, body } = req;

    if (!userId || !body) {
      throw new CustomError(statusCode.notFound, "No picture or user found");
    }

    const newPicture = await Suspiria.create({
      ...body.picture,
      user: new Types.ObjectId(userId),
    });

    res.status(statusCode.ok).json({ picture: newPicture });
  } catch (error) {
    next(error);
  }
};
