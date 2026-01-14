import express, { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../services/user/user.service";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

// GET api/users/:id
router.get("/:id", (req: Request, res: Response) =>
  userController.getUser(req, res),
);

// GET api/users
router.get("/", (req: Request, res: Response) =>
  userController.getAllUsers(req, res),
);

// POST api/users/:id/block
router.post("/:id/block", (req: Request, res: Response) =>
  userController.blockUser(req, res),
);

export default router;
