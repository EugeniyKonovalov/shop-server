import { NextFunction, Request, Response } from "express";
import models from "../../models/models";
import ApiError from "../../error/apiError";

export async function getOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest(`"id" is require!`));
    }

    const product = await models.Product.findOne({
      where: { id },
      include: [{ model: models.ProductInfo, as: "info" }],
    });

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }

    return res.status(200).json(product);
  } catch (error: any) {
    return next(
      ApiError.internal(`Failed to retrieve product: ${error.message}`)
    );
  }
}
