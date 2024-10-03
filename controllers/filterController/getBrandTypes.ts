import { NextFunction, Request, Response } from "express";
import models from "../../models/models";
import ApiError from "../../error/apiError";

export async function getBrandTypes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const typeWithBrands = await models.Brand.findOne({
      where: { id },
      include: {
        model: models.Type,
        through: { attributes: [] },
      },
    });

    if (!typeWithBrands) return next(ApiError.internal("Type not found!"));

    return res.status(200).json({
      brandId: typeWithBrands?.dataValues?.id,
      types: typeWithBrands?.dataValues?.Types,
    });
  } catch (error: any) {
    next(ApiError.internal(`Something went erong ${error.message}`));
  }
}
