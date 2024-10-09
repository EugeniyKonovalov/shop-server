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
      where: { userId: decoded.id },
      include: [
        {
          model: models.Product,
          as: "products",
          attributes: ["id", "name", "price", "img"],
          through: { attributes: ["count"], as: "options" },
        },
      ],
    });

    if (!userCart) {
      return next(ApiError.badRequest("Cart not found"));
    }

    return res.status(200).json(userCart?.dataValues.products);
  } catch (error: any) {
    return next(
      ApiError.internal(`Failed to retrieve cart products: ${error.message}`)
    );
  }
}
