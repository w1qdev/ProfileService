import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../services/user/user.constants";

export const roleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string,
) => {
  const user = req.user;

  if (!user && !user.role) {
    return res.status(401).json({ message: "User unauthorized" });
  }

  if (user.role !== role) {
    return res.status(403).json({ message: "Forbidden request" });
  }

  next();
};

export const ownerOrAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  const userId = req.params.id;

  if (!user && !user.role) {
    return res.status(401).json({ message: "User unauthorized" });
  }

  if (user.userId === userId || user.role === UserRoles.ADMIN) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden request" });
};
