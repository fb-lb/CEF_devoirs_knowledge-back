import jwt, { JwtPayload } from "jsonwebtoken";
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

export function getRequestorId(token: string) {
  try {
    const payload = jwt.decode(token);
    return (payload as MyCheckingPayload).user.id;
  } catch (error: any) {
    throw new AppError(
      500,
      "getRequestorId function in token service failed",
      "Le décodage du token a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}