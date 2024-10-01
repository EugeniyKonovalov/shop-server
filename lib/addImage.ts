import { NextFunction, Request } from "express";
import ApiError from "../error/apiError";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";

export async function addImage(
  img: UploadedFile,
  next: NextFunction
): Promise<string | void> {
  const fileExtension = path.extname(img.name);
  const fileName = v4() + fileExtension;
  const filePath = path.resolve(__dirname, "..", "static", fileName);

  await new Promise<void>((resolve, reject) => {
    try {
      img.mv(filePath, (err) => {
        err
          ? reject(ApiError.internal(`Failed to save the image file: ${err}`))
          : resolve();
      });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  });

  return fileName;
}
