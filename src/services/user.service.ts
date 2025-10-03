import bcrypt from "bcrypt";
import {
  RegistrationBody,
  AddUser,
  RegistrationResponse,
  MyCheckingPayload,
  UpdateUserBody,
} from "../types/Interfaces.js";
import { User } from "../models/databaseAssociations.js";
import { AppError } from "../utils/AppError.js";

export async function addUser(body: RegistrationBody): Promise<MyCheckingPayload['user']> {
  try {
    const { confirmPassword, ...userData } = body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await User.create(userData as AddUser);
    const cleanUser = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        roles: newUser.roles,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
        updatedAt: newUser.updatedAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
        updatedBy: newUser.updatedBy,
      };
    
    return cleanUser;
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
    user.updatedBy = id;
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

export async function getAllUsers(): Promise<MyCheckingPayload['user'][]> {
  try {
    const allUsers = await User.findAll({attributes: ['id', 'email', 'firstName', 'lastName', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']});
    const allPlainUsers: MyCheckingPayload['user'][] = [];

    allUsers.forEach(user => {
      allPlainUsers.push({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
        updatedAt: user.updatedAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
        updatedBy: user.updatedBy,
      });
    });

    return allPlainUsers;
  } catch (error: any) {
    throw new AppError(
      500,
      "Internal server error",
      "Nous ne parvenons par à accéder à notre base de données, veuillez réessayer ultérieurement ou contacter le support.",
      { cause : error }
    );
  }
}

export async function updateUser(requestorId: number, userData: UpdateUserBody): Promise<void> {
  try {
    const user = await User.findByPk(userData.id);
    if(!user) throw new AppError(404, "User not found with provided Id in updateUser function in user services", "L'identifiant fourni ne permet pas de retrouver l'utilisateur à modifier.");
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    //userData.roles.push('user');
    user.roles = userData.roles
    user.isVerified = userData.isVerified;
    user.updatedBy = requestorId;
    user.save();
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

export async function deleteUser(userId: number): Promise<void> {
  try {
    const userToDelete = await User.findByPk(userId, {include: ['UpdatedUsers']});
    if (!userToDelete) throw new AppError(404, "User not found with provided Id in deleteUser function in user services", "L'identifiant fourni ne permet pas de retrouver l'utilisateur à supprimer.");
    // Set null on updatedBy FK if corresponding to userToDeleteId because otherwise it would delete updatedUsers too because onDelete = 'CASCADE'
    if (userToDelete.roles.includes('admin')) {
      for (const user of userToDelete.UpdatedUsers ||  []) {
        user.updatedBy = null;
        await user.save();
      }
    }
    await userToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "Internal server error",
      "Nous ne parvenons par à accéder à notre base de données, veuillez réessayer ultérieurement ou contacter le support.",
      { cause : error }
    )
  }
}