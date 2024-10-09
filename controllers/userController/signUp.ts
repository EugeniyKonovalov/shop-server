import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";
import jwt from "jsonwebtoken";

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let {
      username,
      email,
      password,
      role,
    }: {
      username: string;
      email: string;
      role: "USER" | "ADMIN";
      password: string;
    } = req.body;

    role = role || "USER";

    if (!email && !password) {
      return next(ApiError.badRequest("Email and password is required!"));
    }

    if (!username) {
      return next(ApiError.badRequest("Username is required!"));
    }

    const candidate = await models.User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Email already exist!"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await models.User.create({
      username,
      email,
      role,
      password: hashPassword,
    });

    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }

    const cart = await models.Cart.create({ userId: user?.dataValues?.id });

    if (!cart) {
      return next(
        ApiError.badRequest("Something went wrong: Cart not created!")
      );
    }

    const token = jwt.sign(
      { id: user?.dataValues?.id, email, role },
      process.env.SECRET_KEY || "",
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong: ${error?.message}`));
  }
}
