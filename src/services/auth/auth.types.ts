export type UserRegistrationData = {
  fullName: string;
  email: string;
  password: string;
  birthDate: string;
  refreshToken: string;
};

export type UserAuthenticationData = {
  email: string;
  password: string;
};
