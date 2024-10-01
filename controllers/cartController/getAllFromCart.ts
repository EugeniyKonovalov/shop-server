import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { checkToken } from "../../lib/checkToken";
import models from "../../models/models";

export async function getAllFromCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const decoded = checkToken(req, res);

    if (!decoded) return;

    const userCart = await models.Cart.findOne({
      where: { UserId: decoded.id },
      include: [
        {
          model: models.Product,
          attributes: ["id", "name", "price", "img"],
          through: { attributes: ["count"], as: "options" },
        },
      ],
    });

    if (!userCart) {
      return next(ApiError.badRequest("Cart not found"));
    }

    if (!userCart?.dataValues?.Products?.length) {
      return res.status(200).json({ message: "No products in the cart" });
    }

    return res.status(200).json(userCart?.dataValues?.Products);
  } catch (error: any) {
    return next(
      ApiError.internal(`Failed to retrieve cart products: ${error.message}`)
    );
  }
}
