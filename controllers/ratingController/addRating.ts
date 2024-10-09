import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";

export async function addRating(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, productId, rate } = req.body;

    const product = await models.Product.findOne({
      where: { id: productId },
    });

    if (!product) return next(ApiError.internal("Product not founded!"));

    const rating = await models.Rating.create({
      productId: productId,
      userId: userId,
      rate,
    });

    let ratings = await models.Rating.findAll({
      where: { productId: productId },
    });

    const totalRating = ratings?.reduce(
      (acc, rating) => acc + rating?.dataValues?.rate,
      0
    );

    const averageRating = Math.round(totalRating / ratings.length);

    await models.Product.update(
      { rating: averageRating },
      { where: { id: productId } }
    );

    return res.status(200).json({
      value: rating.dataValues.rate,
      productId: product?.dataValues?.id,
      message: "Your rating has been added successfully",
    });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
