import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function getTypeBrands(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const typeWithBrands = await models.Type.findOne({
      where: { id },
      include: {
        model: models.Brand,
        through: { attributes: [] },
      },
    });

    if (!typeWithBrands) return next(ApiError.internal("Type not found!"));

    return res.status(200).json({
      typeId: typeWithBrands?.dataValues?.id,
      brands: typeWithBrands?.dataValues?.Brands,
    });
  } catch (error: any) {
    next(ApiError.internal(`Something went erong ${error.message}`));
  }
}
