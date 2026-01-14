import { Request, Response, NextFunction } from "express";
import { ValidatorService } from "../shared/validator/validator.service";

const validatorService = new ValidatorService();

export const registrationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedResult = validatorService.validateUserDataOnRegister(req.body);

  if (parsedResult.success === false) {
    return res.status(400).json({
      status: "error",
      message:
        parsedResult.error?.issues ||
        parsedResult.error?.message ||
        parsedResult.message,
    });
  }

  next();
};

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedResult = validatorService.validateUserDataOnAuthentication(
    req.body,
  );

  if (parsedResult.success === false) {
    return res.status(400).json({
      status: "error",
      message:
        parsedResult.error?.issues ||
        parsedResult.error?.message ||
        parsedResult.message,
    });
  }

  next();
};
