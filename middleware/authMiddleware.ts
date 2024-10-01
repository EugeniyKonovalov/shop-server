import { NextFunction, Request, Response } from "express";
import { checkToken } from "./../lib/checkToken";

const authMiddleware = async (
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

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User is not authenticated!" });
  }
};

export default authMiddleware;
