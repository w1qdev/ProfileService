export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export const userDefaultSelect = {
  id: true,
  email: true,
  fullName: true,
  birthDate: true,
  role: true,
  status: true,
};
