import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware/authMiddleware";
import getPictureCard from "../../controllers/pictureCardController/pictureCardController";

const pictureRouter = Router();

pictureRouter.get("/", authMiddleware, getPictureCard);

export default pictureRouter;
