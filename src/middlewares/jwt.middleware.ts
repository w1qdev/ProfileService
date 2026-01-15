import { Request, Response, NextFunction } from "express";
import { JwtService } from "../shared/jwt/jwt.service";

const jwtService = new JwtService();

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const verifyResult = jwtService.verifyAccessToken(token);
    if (!verifyResult) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = verifyResult;
    next();
  } catch (error) {
    next(error);
  }
};
