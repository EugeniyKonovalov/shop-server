import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";
import { Op } from "sequelize";

export async function searchProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { search } = req.query;
    console.log("search: ", search);

    const products = await models.Product.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });

    return res.status(200).json({ count: products.count, data: products.rows });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error?.message}`));
  }
}
