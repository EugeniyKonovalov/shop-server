import { Router } from "express";
import cartController from "../controllers/cartController";
import authMiddleware from "../middleware/authMiddleware";

const cartRouter = Router();

cartRouter.post("/", authMiddleware, cartController.addToCart);
cartRouter.get("/", authMiddleware, cartController.getAllFromCart);
cartRouter.delete("/:id", authMiddleware, cartController.removeFromCart);

export default cartRouter;
