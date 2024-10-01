import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let { brandId, typeId, limit, page } = req.query;

    const parsedBrandId = brandId ? Number(brandId) : undefined;
    const parsedTypeId = typeId ? Number(typeId) : undefined;
    const parsedLimit = limit ? Number(limit) : 9;
    const parsedPage = page ? Number(page) : 1;

    let offset = parsedPage * parsedLimit - parsedLimit;

    let products;

    if (!parsedBrandId && !parsedTypeId) {
      products = await models.Product.findAndCountAll({
        limit: parsedLimit,
        offset,
      });
    }
    if (!parsedBrandId && parsedTypeId) {
      products = await models.Product.findAndCountAll({
        where: { TypeId: parsedTypeId },
        limit: parsedLimit,
        offset,
      });
    }
    if (parsedBrandId && !parsedTypeId) {
      products = await models.Product.findAndCountAll({
        where: { BrandId: parsedBrandId },
        limit: parsedLimit,
        offset,
      });
    }
    if (parsedBrandId && parsedTypeId) {
      products = await models.Product.findAndCountAll({
        where: { TypeId: parsedTypeId, BrandId: parsedBrandId },
        limit: parsedLimit,
        offset,
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    return next(ApiError.internal(`Failed to retrieve products: ${error}`));
  }
}
