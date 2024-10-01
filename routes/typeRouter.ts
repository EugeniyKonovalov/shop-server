import { Router } from "express";
import typeController from "../controllers/typeController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const typeRouter = Router();

typeRouter.post("/", checkRoleMiddleware("ADMIN"), typeController.createType);
typeRouter.get("/", typeController.getAllTypes);

export default typeRouter;
