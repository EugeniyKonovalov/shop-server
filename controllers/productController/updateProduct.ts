import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import models from "../../models/models";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { addImage } from "../../lib/addImage";
import { unlink } from "fs";

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id, name, price } = req.body;

    if (!id) {
      return next(ApiError.badRequest(`"id" is required`));
    }

    const product = await models.Product.findOne({ where: { id } });
    if (!product) {
      return next(ApiError.internal("Product not found"));
    }

    let upadateFields: { name: string; price: number; img?: string } = {
      name,
      price,
    };

    if (req.files && req.files.img) {
      const { img } = req.files as { img: UploadedFile };
      const fileName = await addImage(img, next);

      if (fileName) {
        if (product.dataValues.img) {
          const prevFile = path.resolve(
            __dirname,
            "..",
            "..",
            "static",
            product.dataValues.img
          );
          unlink(prevFile, (err: any) => {
            if (err) console.log(`Failed to delete the old image ${err}`);
          });
        }
        upadateFields.img = fileName;
      }
    }

    await product.update(upadateFields);
    return res.status(200).json({ message: "Updated successfully", product });
  } catch (error: any) {
    return next(ApiError.internal(`Something went wrong ${error.message}`));
  }
}
