import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { checkToken } from "../../lib/checkToken";
import models from "../../models/models";

export async function removeFromCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id } = req.params;

    if (!id) next(ApiError.badRequest(`"id" is required`));
    const formatedProductId = +id;

    const decoded = checkToken(req, res);
    if (!decoded) return next(ApiError.badRequest("User is not authenticated"));

    const cart = await models.Cart.findOne({ where: { userId: decoded?.id } });
    if (!cart) return next(ApiError.badRequest("Cart not found"));

    const cartProduct = await models.CartProduct.findOne({
      where: { productId: formatedProductId, cartId: cart?.dataValues?.id },
    });

    if (!cartProduct)
      return next(ApiError.internal("Product not found in the cart"));

    await cartProduct.destroy();
    return res.status(200).json({ message: "Removed successfully" });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong: ${error.message}`));
  }
}
