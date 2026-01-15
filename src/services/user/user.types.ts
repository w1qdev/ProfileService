import { UserRoles } from "../user/user.constants";

export type User = {
  id: string;
  email: string;
  password: string;
  birthDate: string;
  fullName: string;
};

export type UserUpdate = {
  email?: string;
  fullName?: string;
  password?: string;
  refreshToken?: string;
  role?: UserRoles.ADMIN | UserRoles.USER;
};

export type CustomSelect = { [key: string]: boolean };
