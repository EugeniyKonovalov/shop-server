import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest("Email not found!"));
    }

    let comparePass = bcrypt.compareSync(password, user?.dataValues?.password);
    if (!comparePass) {
      return next(ApiError.badRequest("Password is not correct!"));
    }

    const token = jwt.sign(
      {
        id: user.dataValues?.id,
        email,
        role: user?.dataValues?.role,
      },
      process.env.SECRET_KEY || ""
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    return next(ApiError.internal("Something went wrong!"));
  }
}
