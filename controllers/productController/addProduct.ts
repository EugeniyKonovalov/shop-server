import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { addImage } from "../../lib/addImage";
import models from "../../models/models";
import { ProductInfoAttributes } from "../../types/modelInterfaces";
import { UploadedFile } from "express-fileupload";

interface reqBodyAttributes {
  name: string;
  price: number;
  BrandId: number;
  TypeId: number;
  info: string;
}

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let { name, price, BrandId, TypeId, info }: reqBodyAttributes = req.body;
    if (!req.files || !req.files.img) {
      return next(ApiError.badRequest("Image file is required"));
    }

    const { img } = req.files as { img: UploadedFile };
    const fileName = await addImage(img, next);

    if (!fileName) return next(ApiError.internal("Image not saved"));

    const product = await models.Product.create({
      name,
      price,
      TypeId,
      BrandId,
      img: fileName,
    });

    if (info) {
      try {
        const parsedInfo = JSON.parse(info);
        parsedInfo.forEach((i: ProductInfoAttributes) =>
          models.ProductInfo.create({
            title: i.title,
            description: i.description,
            ProductId: product.dataValues.id,
          })
        );
      } catch (err) {
        return next(ApiError.badRequest("Invalid info format. Must be JSON."));
      }
    }

    return res.status(200).json(product);
  } catch (error: any) {
    return next(ApiError.internal(`Failed to add a product: ${error.message}`));
  }
}
