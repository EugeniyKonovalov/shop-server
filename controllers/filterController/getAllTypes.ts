import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function getAllTypes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const types = await models.Type.findAll();

    return res.status(200).json(types);
  } catch (error: any) {
    return next(ApiError.internal(`Failed to retrieve types ${error.message}`));
  }
}
