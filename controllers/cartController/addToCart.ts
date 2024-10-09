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

    const { productId, count } = req.body;

    if (!productId) {
      return next(ApiError.badRequest(`"productId" is required!`));
    }

    const userCart = await models.Cart.findOne({
      where: { userId: decoded.id },
    });

    if (!userCart) {
      return next(ApiError.badRequest("Cart not exist"));
    }

    const product = await models.Product.findOne({ where: { id: productId } });

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }

    const existingProduct = await models.CartProduct.findOne({
      where: { productId, cartId: userCart.dataValues.id },
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already in the cart" });
    }

    await models.CartProduct.create({
      productId,
      cartId: userCart.dataValues.id,
      count,
    });

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
