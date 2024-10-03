import { NextFunction, Request, Response } from "express";
import models from "../../models/models";
import ApiError from "../../error/apiError";

export async function createTypeBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { typeName, brandName } = req.body;

    if (!typeName || !brandName)
      return next(ApiError.badRequest('"typeName" & "brandName" is required'));

    let type = await models.Type.findOne({ where: { name: typeName } });
    if (!type) type = await models.Type.create({ name: typeName });

    let brand = await models.Brand.findOne({ where: { name: brandName } });
    if (!brand) brand = await models.Brand.create({ name: brandName });

    let existingRelation = await models.TypeBrand.findOne({
      where: { TypeId: type?.dataValues?.id, BrandId: brand?.dataValues?.id },
    });

    if (!existingRelation)
      await models.TypeBrand.create({
        TypeId: type?.dataValues?.id,
        BrandId: brand?.dataValues?.id,
      });

    return res.status(200).json({ message: "Created successfully" });
  } catch (error: any) {
    next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
