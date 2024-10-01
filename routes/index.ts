import { Router } from "express";
import userRouter from "./userRouter";
import productRouter from "./productsRouter";
import typeRouter from "./typeRouter";
import brandRouter from "./brandRouter";
import cartRouter from "./cartRouter";

const router = Router();

router.use("/auth", userRouter);
router.use("/product", productRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/cart", cartRouter);

export default router;
