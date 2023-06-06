import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware/authMiddleware.js";
import { getPictureCard } from "../../controllers/pictureCardController/pictureCardController.js";

const pictureRouter = Router();

pictureRouter.get("/", authMiddleware, getPictureCard);

export default pictureRouter;
