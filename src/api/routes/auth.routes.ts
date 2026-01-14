import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../../services/auth/auth.service";
import {
  registrationMiddleware,
  authenticationMiddleware,
} from "../../middlewares/auth.middleware";

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// POST api/auth/register
router.post(
  "/register",
  registrationMiddleware,
  (req: Request, res: Response) => authController.register(req, res),
);

// POST api/auth/login
router.post("/login", authenticationMiddleware, (req: Request, res: Response) =>
  authController.login(req, res),
);

export default router;
