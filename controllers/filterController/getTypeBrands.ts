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
        as: "brands",
        through: { attributes: [] },
      },
    });

    if (!typeWithBrands) return next(ApiError.internal("Type not found!"));

    return res.status(200).json({
      typeId: typeWithBrands?.dataValues?.id,
      name: typeWithBrands?.dataValues?.name,
      brands: typeWithBrands?.dataValues?.brands,
    });
  } catch (error: any) {
    next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
