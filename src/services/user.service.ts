import bcrypt from "bcrypt";
import {
  RegistrationBody,
  AddUser,
  MyCheckingPayload,
  UpdateUserBody,
  ApiResponse,
} from "../types/Interfaces.js";
import { User } from "../models/databaseAssociations.js";
import { AppError } from "../utils/AppError.js";
import { Request } from "express";

/**
 * Creates a user in the database.
 * 
 * @async
 * @function addUser
 * 
 * @param {RegistrationBody} body - Object containing user informations :
 * {
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   password: string;
 *   confirmPassword: string;
 * }
 *  
 * @returns {Promise<MyCheckingPayload['user']>} Returns an object containing the user informations.
 * {
 *   id: number;
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   roles: ("user" | "admin")[];
 *   isVerified: boolean;
 *   createdAt: string;
 *   updatedAt: string;
 *   updatedBy: number | null;
 * }
 * 
 * @throws {AppError} If the email address is already used by a registered user.
 * @throws {AppError} If an unexpected error occurs during the creation.
 */
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

/**
 * Get a user informations in the database.
 * 
 * @async
 * @function getUser
 * 
 * @param {number} userId - Id of the user to retrieve.
 *  
 * @returns {Promise<MyCheckingPayload['user']>} Returns an object containing the user informations.
 * {
 *   id: number;
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   roles: ("user" | "admin")[];
 *   isVerified: boolean;
 *   createdAt: string;
 *   updatedAt: string;
 *   updatedBy: number | null;
 * }
 * 
 * @throws {AppError} If the user is not found in the database with the provided id.
 * @throws {AppError} If an unexpected error occurs during the retrieval.
 */
export async function getUser(userId: number): Promise<MyCheckingPayload['user']> {
  try {
    const user = await User.findByPk(userId);

    if(!user) throw new AppError(404, "User not found with provided Id in getUser function in user services", "L'identifiant fourni ne permet pas de retrouver l'utilisateur recherché.");
    const cleanUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedAt: user.updatedAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedBy: user.updatedBy,
    };
    
    return cleanUser;
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

/**
 * Sets user isVerified property to true.
 * 
 * @async
 * @function setIsVerified
 * 
 * @param {number} id - The ID of the user to update.
 * 
 * @returns {Promise<ApiResponse>} Returns success: true if user isVerfied is successfully set to true.
 * 
 * @throws {AppError} If user to update is not found with provided ID.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function setIsVerified(id: number): Promise<ApiResponse> {
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

/**
 * Retrieves all user informations from the database.
 * 
 * @async
 * @function getAllUsers
 * 
 * @returns {Promise<MyCheckingPayload['user'][]>} Return a list of object containing informations on all users in the database.
 * 
 * @throws {AppError} If an unexpected error occurs during users retrieval.
 */
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
        updatedAt: user.updatedAt.toISOString() === user.createdAt.toISOString() ? '' : user.updatedAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
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

/**
 * Update informations of a user.
 * 
 * @async
 * @function updateUser
 * 
 * @param {number} requestorId - The ID of the user performing the update. 
 * @param {UpdateUserBody} userData - Object containing the new informations :
 * {
 *   id: number;
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   roles: ("user" | "admin")[];
 *   isVerified: boolean;
 * }
 * 
 * @return {Promise<void>}
 * 
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateUser(requestorId: number, userData: UpdateUserBody): Promise<void> {
  try {
    const user = await User.findByPk(userData.id);
    if(!user) throw new AppError(404, "User not found with provided Id in updateUser function in user services", "L'identifiant fourni ne permet pas de retrouver l'utilisateur à modifier.");
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
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

/**
 * Deletes a user.
 * 
 * @async
 * @function deleteUser
 * 
 * @param {number} userId - The ID of the user to delete.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the user to delete is not found in the database with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the deletion.
 */
export async function deleteUser(userId: number): Promise<void> {
  try {
    const userToDelete = await User.findByPk(userId, {include: ['UpdatedUsers']});
    if (!userToDelete) throw new AppError(404, "User not found with provided Id in deleteUser function in user services", "L'identifiant fourni ne permet pas de retrouver l'utilisateur à supprimer.");
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

/**
 * Checks if user property on the request object is not null. If not, it returns the ID of the user who made the request.
 * 
 * @function getUserIdInRequest
 * 
 * @param {Request} req - The request sent by the front-end, containing a user property whose value is the user ID. 
 * 
 * @returns {number} Returns the ID of the user who made the request.
 * 
 * @throws {AppError} If user property on the request object is null.
 */
export function getUserIdInRequest(req: Request): number {
  if(!req.user) throw new AppError(
    404,
    "getUserIdInRequest function in user service failed : no id stored in req.id in private middleware or you have to use a private middleware to get id in request",
    "Votre identifiant n'a pas été retrouvé dans la base de données, si vous n'êtes pas connecté actuellement, veuillez contacter le support."
  )

  return req.user.id;
}