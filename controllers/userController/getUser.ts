import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { checkToken } from "../../lib/checkToken";
import models from "../../models/models";

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const decoded = checkToken(req, res);

    if (!decoded) return;

    const user = await models.User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }
    const { password, ...other } = user?.dataValues;

    return res.status(200).json(other);
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error?.message}`));
  }
}
