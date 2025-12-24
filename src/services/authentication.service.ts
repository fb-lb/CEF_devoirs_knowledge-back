import { User } from "../models/databaseAssociations.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from 'bcrypt';
import { UserData } from "../types/Interfaces.js";

/**
 * Login test. Retrieves a user whith the provided email and check if password provided and password of the retrieved user are the same.
 * 
 * @async
 * @function testLoginRequest
 * 
 * @param {string} email - Email used to retrieve user trying to login.
 * @param {string} password - Password compared to password of retrieved user to check user authentication.
 *  
 * @returns {Promise<UserData|string>}
 * Returns Promise<string> if no user retrieved with the provided email
 * and Promise<UserData> if email and password match with a user in the database.
 * 
 * @throws {AppError} If an unexpected error occurs during the login test.
 */
export async function testLoginRequest(email: string, password: string): Promise<UserData | string> {
  try {
    const user = await User.findOne(
      { where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']
    });

    if (!user) return 'Cet email ne correspond à aucun compte enregistré.';
    
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) return 'Email et/ou mot de passe invalide.';

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
    throw new AppError(
      500,
      "internal server error",
      "Une erreur interne est survenue, si vous ne parvenez pas à vous connecter, merci de contacter le support.",
      { cause : error }
    )
  }
}

/**
 * Retrieves a user whith provided ID and check if user has the desired role.
 * 
 * @async
 * @function checkAuthorization
 * 
 * @param {number} userId - The ID of the user to retrieve. 
 * @param {'user' | 'admin'} role - 'user' to check if user is a user and 'admin' to check if user is an admin.
 * 
 * @returns {Promise<boolean>} True if user has the desired role, false otherwise.
 * 
 * @throws {AppError} If user is not found with provided ID.
 * @throws {AppError} If an unexpected error occurs during role verification. 
 */
export async function checkAuthorization(userId: number, role: 'user' | 'admin'): Promise<boolean> {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(
        404,
        'checkAuthorization function in authentication service failed because no user was found in the database with provided ID',
        'Nous ne parvenons pas à vous retrouver dans la base de données. Veuillez contacter le support.'
      );
    }
    
    return user.roles.includes(role) ? true : false;

  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "internal server error",
      "Une erreur interne est survenue, si vous ne parvenez pas à accéder au contenu, merci de contacter le support.",
      { cause : error }
    )
  }
}