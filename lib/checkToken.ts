import jwt from "jsonwebtoken";
import { JwtPayload } from "./../types/jwtPayloadInterface";
import { Request, Response } from "express";

export const checkToken = (req: Request, res: Response): JwtPayload | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "User is not authenticated!" });
    return null;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "User is not authenticated!" });
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as JwtPayload;

    if (!decoded) {
      res.status(400).json({ message: "Something went wrong" });
      return null;
    }

    return decoded;
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
    return null;
  }
};
