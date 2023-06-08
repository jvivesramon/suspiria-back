import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  deletePicture,
  getPictures,
} from "../../controllers/pictureController/picturesController.js";

const pictureRouter = Router();

pictureRouter.get("/", authMiddleware, getPictures);

pictureRouter.delete("/:pictureId", authMiddleware, deletePicture);

export default pictureRouter;
