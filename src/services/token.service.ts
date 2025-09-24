import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import {
  MyCheckingPayload,
  RegistrationResponse,
} from "../types/Interfaces.js";

export async function generateEmailToken(email: string): Promise<string> {
  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["id", "firstName", "lastName", "email", "roles"],
    });

    if (user) {
      const token: string = jwt.sign(
        {
          user: user,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 24 * 24,
        }
      );

      return token;
    } else {
      throw new AppError(
        400,
        "user not found in the database",
        "Ce compte ne se trouve pas dans notre base de données, veuillez contacter le support technique pour résoudre votre problème."
      );
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      500,
      "generateEmailToken function in token service failed",
      "Une erreur interne est survenue, si vous ne parvenez plus à créer de nouveau compte avec votre adresse mail, merci de contacter le support.",
      { cause: error }
    )
  }
}

export function checkEmailToken(token: string): RegistrationResponse<number> {
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    return {
      success: true,
      message: "",
      data: (payload as MyCheckingPayload).user.id,
    };
  } catch (error: any) {
    throw new AppError(
      500,
      "checkMail function in token service failed",
      "La vérification du token a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}
