import { Router } from "express";
import userRouter from "./userRouter";
import productRouter from "./productsRouter";
import cartRouter from "./cartRouter";
import filterRouter from "./filterRouter";

const router = Router();

router.use("/auth", userRouter);
router.use("/product", productRouter);
router.use("/filter", filterRouter);
router.use("/cart", cartRouter);

export default router;
