import { Router } from "express";
import { validate } from "express-validation";
import path from "../../utils/paths/paths.js";
import loginController from "../../controllers/userControllers.ts/userControllers.js";
import loginSchema from "../../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  path.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginController
);

export default userRouter;
