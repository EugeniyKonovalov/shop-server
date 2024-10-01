import { checkToken } from "./../../lib/checkToken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest(`"id" is required`));
    }

    const decoded = checkToken(req, res);
    if (!decoded) return;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      return next(ApiError.internal("Product not found"));
    }

    await product.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return next(ApiError.badRequest(`Something went wrong ${error?.message}`));
  }
}
