import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function createType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { name }: { name: string } = req.body;

    if (!name) {
      return next(ApiError.badRequest("Name is required!"));
    }

    const type = await models.Type.create({ name });
    return res.status(200).json(type);
  } catch (error: any) {
    return next(ApiError.internal(`Failed to create type: ${error.message}`));
  }
}
