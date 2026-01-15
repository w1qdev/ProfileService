import { prisma } from "../../database/prisma";
import { UserStatus, userDefaultSelect } from "./user.constants";
import { UserRegistrationData } from "../auth/auth.types";
import { CustomSelect, UserUpdate } from "./user.types";

export class UserService {
  async getUserById(userId: string, customSelect?: CustomSelect) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { ...userDefaultSelect, ...customSelect },
    });

    return user;
  }

  async getUserByEmail(email: string, customSelect?: CustomSelect) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { ...userDefaultSelect, ...customSelect },
    });

    return user;
  }

  async getAllUsers(customSelect?: CustomSelect) {
    const users = await prisma.user.findMany({
      select: { ...userDefaultSelect, ...customSelect },
    });

    return users;
  }

  async blockUser(userId: string, customSelect?: CustomSelect) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: UserStatus.BLOCKED,
      },
      select: { ...userDefaultSelect, ...customSelect },
    });

    return user;
  }

  async createUser(
    UserData: UserRegistrationData,
    customSelect?: CustomSelect,
  ) {
    const user = await prisma.user.create({
      data: {
        email: UserData.email,
        fullName: UserData.fullName,
        birthDate: UserData.birthDate,
        password: UserData.password,
        refreshToken: UserData.refreshToken,
      },
      select: { ...userDefaultSelect, ...customSelect },
    });

    return user;
  }

  async updateUser(
    userId: string,
    newUserData: UserUpdate,
    customSelect?: CustomSelect,
  ) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...newUserData,
      },
      select: { ...userDefaultSelect, ...customSelect },
    });

    return updatedUser;
  }
}
