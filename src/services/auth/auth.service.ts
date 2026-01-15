import { UserService } from "../user/user.service";
import { UserRegistrationData, UserAuthenticationData } from "./auth.types";
import { PasswordService } from "../../shared/security/password.service";
import { JwtService } from "../../shared/jwt/jwt.service";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  private readonly userService: UserService = new UserService();
  private readonly passwordService: PasswordService = new PasswordService();
  private readonly jwtService: JwtService = new JwtService();

  async register(userData: UserRegistrationData) {
    const { fullName, email, password, birthDate } = userData;

    const existUser = await this.userService.getUserByEmail(email);

    if (existUser) {
      return { message: "User already exists" };
    }

    const hashedPassword = await this.passwordService.hash(password);
    const userId = uuidv4();

    const { refreshToken, accessToken } =
      this.jwtService.generateTokens(userId);

    const newUser = await this.userService.createUser({
      fullName,
      email,
      password: hashedPassword,
      birthDate,
      refreshToken,
    });

    const response = {
      ...newUser,
      refreshToken,
      accessToken,
    };

    return response;
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

    const { refreshToken, accessToken } = this.jwtService.generateTokens(
      user.id,
    );

    await this.userService.updateUser(user.id, {
      refreshToken,
    });

    const response = {
      ...user,
      refreshToken,
      accessToken,
    };

    const { password: userPassword, ...result } = response;

    return result;
  }
}
