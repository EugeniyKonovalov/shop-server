import { Router } from "express";
import productController from "../controllers/productController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";
import ratingController from "../controllers/ratingController";

const productRouter = Router();

productRouter.post(
  "/",
  checkRoleMiddleware("ADMIN"),
  productController.addProduct
);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getOneProduct);
productRouter.put(
  "/",
  checkRoleMiddleware("ADMIN"),
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  checkRoleMiddleware("ADMIN"),
  productController.deleteProduct
);
productRouter.post("/add-rating", ratingController.addRating);

export default productRouter;
