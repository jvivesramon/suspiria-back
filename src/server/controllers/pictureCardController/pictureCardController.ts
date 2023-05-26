import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Suspiria from "../../../database/models/Suspiria.js";
import chalk from "chalk";

const debug = createDebug(
  "suspiria-api:src:server:controller:pictureCardController:"
);

const getPictureCard = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pictureCard = await Suspiria.find().limit(10).exec();
    res.status(200).json(pictureCard);
  } catch (error) {
    debug(chalk.bgMagenta(error.message));

    next(error);
  }
};

export default getPictureCard;
