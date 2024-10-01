import { Router } from "express";
import brandController from "../controllers/brandController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";
const brandRouter = Router();

brandRouter.post(
  "/",
  checkRoleMiddleware("ADMIN"),
  brandController.createBrand
);
brandRouter.get("/", brandController.getAllBrands);

export default brandRouter;
