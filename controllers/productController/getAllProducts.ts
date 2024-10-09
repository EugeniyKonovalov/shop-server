import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let { brandId, typeId, limit, page, search } = req.query;

    const parsedBrandId = brandId ? Number(brandId) : undefined;
    const parsedTypeId = typeId ? Number(typeId) : undefined;
    const parsedLimit = limit ? Number(limit) : 9;
    const parsedPage = page ? Number(page) : 1;

    const offset = parsedPage * parsedLimit - parsedLimit;

    const options: any = {};

    if (search) {
      options.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (parsedTypeId) {
      options.typeId = parsedTypeId;
    }
    if (parsedBrandId) {
      options.brandId = parsedBrandId;
    }

    const products = await models.Product.findAndCountAll({
      where: options,
      limit: parsedLimit,
      offset,
    });

    let pages;

    products?.count <= parsedLimit
      ? (pages = 1)
      : (pages = Math.ceil(products?.count / parsedLimit));

    return res.status(200).json({
      count: products?.count,
      page: parsedPage,
      pages,
      data: products?.rows,
    });
  } catch (error) {
    return next(ApiError.internal(`Failed to retrieve products: ${error}`));
  }
}
