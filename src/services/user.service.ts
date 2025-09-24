import bcrypt from "bcrypt";
import {
  RegistrationBody,
  AddUser,
  RegistrationResponse,
} from "../types/Interfaces.js";
import { User } from "../models/databaseAssociations.js";
import { AppError } from "../utils/AppError.js";

export async function addUser(body: RegistrationBody): Promise<User> {
  try {
    const { confirmPassword, ...userData } = body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await User.create(userData as AddUser);
    return newUser;
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new AppError(
        409,
        "Email already used by another account",
        "Ce mail est déjà utilisé par un compte enregistré, veuillez utiliser un autre mail.",
        { cause : error }
      );
    }
    throw new AppError(
      500,
      "addUser function user service failed",
      "Un problème interne a eu lieu, nous ne parvenons pas à vous enregistrer dans notre base de données pour le moment.",
      { cause : error }
    );
  }
}

export async function setIsVerified(id: number): Promise<RegistrationResponse> {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(
        404,
        "User not found with provided id in token",
        "Le compte est introuvable dans notre base de données, veuillez réessayer ultérieurement ou contacter le support."
      );
    }
    user.isVerified = true;
    user.save();
    return {
      success: true,
      message: "",
    };
  } catch (error: any) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      500,
      "Internal server error",
      "Nous ne parvenons par à accéder à notre base de données, veuillez réessayer ultérieurement ou contacter le support.",
      { cause : error }
    );
  }
}
