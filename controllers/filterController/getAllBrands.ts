import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function getAllBrands(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const brands = await models.Brand.findAll();

    return res.status(200).json(brands);
  } catch (error: any) {
    return next(
      ApiError.internal(`Failed to retrieve brands: ${error.message}`)
    );
  }
}
