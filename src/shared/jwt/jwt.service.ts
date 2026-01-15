import jwt from "jsonwebtoken";
import { UserRoles } from "../../services/user/user.constants";

export class JwtService {
  private readonly jwt = jwt;
  private readonly jwtAccessSecretToken = process.env.JWT_ACCESS_SECRET;
  private readonly jwtRefreshSecretToken = process.env.JWT_REFRESH_SECRET;
  private readonly jwtAccessTokenExpirationTime =
    process.env.JWT_ACCESS_EXPIRES_IN;
  private readonly jwtRefreshTokenExpirationTime =
    process.env.JWT_REFRESH_EXPIRES_IN;

  generateTokens(userId: string, role?: UserRoles) {
    const accessToken = this.jwt.sign(
      { userId, role: role || UserRoles.USER },
      this.jwtAccessSecretToken,
      { expiresIn: this.jwtAccessTokenExpirationTime },
    );

    const refreshToken = this.jwt.sign({ userId }, this.jwtRefreshSecretToken, {
      expiresIn: this.jwtRefreshTokenExpirationTime,
    });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string) {
    try {
      const result = this.jwt.verify(token, this.jwtAccessSecretToken);

      return result;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string) {
    try {
      const result = this.jwt.verify(token, this.jwtRefreshSecretToken);

      return result;
    } catch (error) {
      return null;
    }
  }
}
