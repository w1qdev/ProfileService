export const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  },

  database: {
    uri: process.env.DATABASE_URL,
  },

  bcrypt: {
    secretKey: process.env.BCRYPT_SECRET,
  },

  jwt: {
    jwtAccessSecretToken: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecretToken: process.env.JWT_REFRESH_SECRET,
    jwtAccessTokenExpirationTime: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshTokenExpirationTime: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
