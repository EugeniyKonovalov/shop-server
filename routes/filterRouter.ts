import { Router } from "express";
import typeBrandController from "../controllers/filterController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const filterRouter = Router();

filterRouter.post(
  "/create",
  checkRoleMiddleware("ADMIN"),
  typeBrandController.createTypeBrand
);
filterRouter.get("/type", typeBrandController.getAllTypes);
filterRouter.get("/type/:id", typeBrandController.getTypeBrands);
filterRouter.get("/brand", typeBrandController.getAllBrands);
filterRouter.get("/brand/:id", typeBrandController.getBrandTypes);

export default filterRouter;
