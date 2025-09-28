import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import {
  MyCheckingPayload,
  RegistrationResponse
} from "../types/Interfaces.js";

export function generateToken(user: MyCheckingPayload['user']): string {
  const token = jwt.sign({user: user}, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  return token;
}

export function isTokenValid(token: string): RegistrationResponse<MyCheckingPayload['user']> {
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    return {
      success: true,
      message: "",
      data: (payload as MyCheckingPayload).user,
    };
  } catch (error: any) {
    throw new AppError(
      500,
      "isTokenValid function in token service failed",
      "La vérification du token a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}