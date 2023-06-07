import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  deletePicture,
  getPictureCard,
} from "../../controllers/pictureCardController/pictureCardController.js";

const pictureRouter = Router();

pictureRouter.get("/", authMiddleware, getPictureCard);

pictureRouter.delete("/:pictureId", authMiddleware, deletePicture);

export default pictureRouter;
