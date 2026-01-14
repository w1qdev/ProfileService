import { UserService } from "../../services/user/user.service";
import { Request, Response } from "express";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const response = {
        status: "ok",
        data: user,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();

      const response = {
        status: "ok",
        data: users,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async blockUser(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      const user = await this.userService.blockUser(userId);

      if (!user.id) {
        return res.status(404).json({ message: "User not found" });
      }

      const response = {
        status: "ok",
        data: {
          message: "User blocked successfully",
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "Internal server error" });
    }
  }
}
