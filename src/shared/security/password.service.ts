import bcrypt from "bcrypt";
import { PasswordServiceOptions } from "./password.types";

export class PasswordService {
  private readonly hasher: typeof bcrypt;
  private readonly saltRounds: number = 12;

  constructor(options?: PasswordServiceOptions) {
    this.saltRounds = options?.saltRounds || this.saltRounds;
    this.hasher = bcrypt;
  }

  async hash(password: string): Promise<string> {
    const hashedPassword = await this.hasher.hash(password, this.saltRounds);

    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await this.hasher.compare(password, hashedPassword);

    return isMatch;
  }
}
