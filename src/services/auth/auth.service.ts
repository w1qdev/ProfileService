import { UserService } from "../user/user.service";
import { prisma } from "../../database/prisma";
import { UserRegistrationData, UserAuthenticationData } from "./auth.types";
import { PasswordService } from "../../shared/security/password.service";
import { JwtService } from "../../shared/jwt/jwt.service";

export class AuthService {
  private readonly userService: UserService = new UserService();
  private readonly passwordService: PasswordService = new PasswordService();
  private readonly jwtService: JwtService = new JwtService();

  async register(userData: UserRegistrationData) {
    const { fullName, email, password, birthDate } = userData;

    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return { message: "User already exists" };
    }

    const hashedPassword = await this.passwordService.hash(password);

    const newUser = await this.userService.createUser({
      fullName,
      email,
      password: hashedPassword,
      birthDate,
    });

    return newUser;
  }

  async authenticate(userData: UserAuthenticationData) {
    const { email, password } = userData;

    const user = await this.userService.getUserByEmail(email, {
      password: true,
    });

    if (!user) {
      return { message: "User not found" };
    }

    const isPasswordValid = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return { message: "Invalid password" };
    }

    const { password: userPassword, ...result } = user;

    return result;
  }
}
