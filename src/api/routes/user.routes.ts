import express, { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../services/user/user.service";
import { jwtMiddleware } from "../../middlewares/jwt.middleware";
import {
  ownerOrAdminMiddleware,
  roleMiddleware,
} from "../../middlewares/role.middleware";
import { UserRoles } from "../../services/user/user.constants";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

// GET api/users/:id
router.get(
  "/:id",
  jwtMiddleware,
  ownerOrAdminMiddleware,
  (req: Request, res: Response) => userController.getUser(req, res),
);

// GET api/users
router.get(
  "/",
  jwtMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    roleMiddleware(req, res, next, UserRoles.ADMIN),
  (req: Request, res: Response) => userController.getAllUsers(req, res),
);

// POST api/users/:id/block
router.post(
  "/:id/block",
  jwtMiddleware,
  ownerOrAdminMiddleware,
  (req: Request, res: Response) => userController.blockUser(req, res),
);

export default router;
