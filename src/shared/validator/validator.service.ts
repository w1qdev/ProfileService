import * as z from "zod";
import {
  UserRegistrationData,
  UserAuthenticationData,
} from "../../services/auth/auth.types";

export class ValidatorService {
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private readonly userRegistrationSchema = z.object({
    fullName: z
      .string({ message: "Full name is required" })
      .min(2, { message: "Full name must be minimum 2 characters long" })
      .max(120, { message: "Full name must be maximum 120 characters long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be minimum 8 characters long" })
      .max(120, { message: "Password must be maximum 120 characters long" }),
    birthDate: z.string({ message: "Birth date is required" }).min(5),
  });
  private readonly userAuthenticationSchema = z.object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be minimum 8 characters long" })
      .max(120, { message: "Password must be maximum 120 characters long" }),
  });

  validateUserDataOnRegister(userData: UserRegistrationData) {
    const parsedUser = this.userRegistrationSchema.safeParse(userData);

    if (!parsedUser.success) {
      return parsedUser;
    }

    if (!this.validateUserPassword(userData.password)) {
      return {
        success: false,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      };
    }

    return parsedUser;
  }

  validateUserDataOnAuthentication(userData: UserAuthenticationData) {
    const parsedUser = this.userAuthenticationSchema.safeParse(userData);

    if (!parsedUser.success) {
      return parsedUser;
    }

    if (!this.validateUserPassword(userData.password)) {
      return {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      };
    }

    return parsedUser;
  }

  validateUserPassword(password: string) {
    return this.passwordRegex.test(password);
  }
}
