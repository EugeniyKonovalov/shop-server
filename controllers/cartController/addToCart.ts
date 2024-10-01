import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { checkToken } from "../../lib/checkToken";
import models from "../../models/models";

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const decoded = checkToken(req, res);

    if (!decoded) return;

    const { ProductId, count } = req.body;

    if (!ProductId) {
      return next(ApiError.badRequest(`"ProductId" is required!`));
    }

    const userCart = await models.Cart.findOne({
      where: { UserId: decoded.id },
    });

    if (!userCart) {
      return next(ApiError.badRequest("Cart not exist"));
    }

    const product = await models.Product.findOne({ where: { id: ProductId } });

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }

    const existingProduct = await models.CartProduct.findOne({
      where: { ProductId, CartId: userCart.dataValues.id },
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already in the cart" });
    }

    await models.CartProduct.create({
      ProductId,
      CartId: userCart.dataValues.id,
      count,
    });

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
