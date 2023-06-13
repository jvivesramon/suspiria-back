import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addPicture,
  deletePicture,
  getOnePicture,
  getPictures,
} from "../../controllers/pictureController/picturesController.js";
import pictureSchema from "../../schemas/pictureSchema/pictureSchema.js";
import { validate } from "express-validation";

const pictureRouter = Router();

pictureRouter.get("/", authMiddleware, getPictures);

pictureRouter.delete("/:pictureId", authMiddleware, deletePicture);

pictureRouter.post(
  "/",
  authMiddleware,
  validate(pictureSchema, {}, { abortEarly: false }),
  addPicture
);

pictureRouter.get("/:pictureId", authMiddleware, getOnePicture);

export default pictureRouter;
