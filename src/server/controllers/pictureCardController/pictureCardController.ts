import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import Suspiria from "../../../database/models/Suspiria.js";

const debug = createDebug(
  "suspiria-api:src:server:controller:pictureCardController:"
);

export const getPictureCard = async (
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
  req: Request<{ idPicture: string }>,
  res: Response,
  next: NextFunction
) => {
  const { idPicture } = req.params;

  try {
    const picturePosition = await Suspiria.findOne({ idPicture }).exec();

    if (!picturePosition) {
      res.status(404).json({ message: "No pictures found" });
      return;
    }

    await Suspiria.findByIdAndDelete(idPicture).exec();

    res.status(200).json({ message: "Picture succesfully deleted" });
  } catch (error) {
    debug(chalk.bgMagenta(error.message));

    next(error);
  }
};
