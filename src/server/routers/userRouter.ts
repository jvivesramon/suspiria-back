import { Router } from "express";
import path from "../utils/paths/paths.js";
import loginController from "../controllers/userControllers.ts/userControllers.js";

const userRouter = Router();

userRouter.post(path.login, loginController);

export default userRouter;
