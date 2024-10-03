import { NextFunction, Request, Response } from "express";
import { checkToken } from "../lib/checkToken";
import ApiError from "../error/apiError";

const checkRoleMiddleware = (role: "ADMIN" | "USER") => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const decoded = checkToken(req, res);

      if (!decoded) return;

      if (decoded.role !== role)
        return next(ApiError.forbiden("You are not access!"));

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "User is not authenticated!" });
    }
  };
};

export default checkRoleMiddleware;
