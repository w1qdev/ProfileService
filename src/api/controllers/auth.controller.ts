import { Request, Response } from "express";
import { type AuthService } from "../../services/auth/auth.service";
import { PasswordService } from "../../shared/security/password.service";

export class AuthController {
  private readonly authService: AuthService;
  private readonly passwordService: PasswordService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.passwordService = new PasswordService();
  }

  async register(req: Request, res: Response) {
    try {
      const userData = req.body;

      const user = await this.authService.register(userData);

      const response = {
        status: "ok",
        data: user,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Some internal error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData = req.body;

      const user = await this.authService.authenticate(userData);

      const response = {
        status: "ok",
        data: user,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Some internal error" });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.headers.authorization?.split(" ")[1];

      if (!refreshToken) {
        return res.status(401).json({ message: "No token provided" });
      }

      const user = await this.authService.refreshToken(refreshToken);

      const response = {
        status: "ok",
        data: user,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Some internal error" });
    }
  }
}
