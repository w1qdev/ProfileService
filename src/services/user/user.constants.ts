export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const userDefaultSelect = {
  id: true,
  email: true,
  fullName: true,
  birthDate: true,
  role: true,
  status: true,
};
