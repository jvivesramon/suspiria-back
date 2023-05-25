import { type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../../types.js";
import User from "../../../../database/models/User.js";
import CustomError from "../../../../CustomError/CustomError.js";

const loginController = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(user.password, password))) {
      const error = new CustomError(401, "Wrong credentials");

      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginController;
