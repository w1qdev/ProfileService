import jwt from "jsonwebtoken";

export class JwtService {
  private readonly jwt = jwt;
  private readonly jwtAccessSecretToken = process.env.JWT_ACCESS_SECRET;
  private readonly jwtRefreshSecretToken = process.env.JWT_REFRESH_SECRET;
  private readonly jwtAccessTokenExpirationTime =
    process.env.JWT_ACCESS_EXPIRES_IN;
  private readonly jwtRefreshTokenExpirationTime =
    process.env.JWT_REFRESH_EXPIRES_IN;

  generateTokens(userId: string) {
    const accessToken = this.jwt.sign(
      { userId },
      {
        secret: this.jwtAccessSecretToken,
        expiresIn: this.jwtAccessTokenExpirationTime,
      },
    );

    const refreshToken = this.jwt.sign(
      { userId },
      {
        secret: this.jwtRefreshSecretToken,
        expiresIn: this.jwtRefreshTokenExpirationTime,
      },
    );

    return { accessToken, refreshToken };
  }
}
