import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import {
  ApiResponse,
  TokenPayload,
  UserData,
} from "../types/Interfaces.js";

/**
 * Generate a Json Web Token.
 * 
 * @function generateUserToken
 * 
 * @param {UserData} user - Contains informations for the token payload.
 * @param {number} hours - number of hours that token is valid (1 by default).
 * 
 * @returns {string} The Json Web Token generated.
 */
export function generateUserToken(user: UserData, hours: number = 1): string {
  const cleanUser = {
    id: user.id,
    roles: user.roles,
  };
  const token = jwt.sign(cleanUser, process.env.JWT_USER_SECRET, { expiresIn: 60 * 60 * hours });
  return token;
}

/**
 * Generate a Json Web Token for image reading.
 * 
 * @function generateImageToken
 * 
 * @param {UserData} imageId - Image ID that user can read with this token.
 * 
 * @returns {string} The Json Web Token generated.
 */
export function generateImageToken(imageId: number): string {
  const tokenPayload = {
    id: imageId,
    scope: ['image:read'],
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_IMAGE_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
  return token;
}

/**
 * Checks if a Json Web Token is valid by verifying the signature with user jwt secret.
 * 
 * @function isUserTokenValid
 * 
 * @param {string} token - The Json Web Token to check.
 * 
 * @returns {ApiResponse<TokenPayload>} Success: true, message: "", data: the token payload containing the user informations.
 * 
 * @throws {AppError} If an unexpected error occurs during token validity verification.
 */
export function isUserTokenValid(token: string): ApiResponse<TokenPayload> {
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_USER_SECRET as string
    );

    return {
      success: true,
      message: "",
      data: payload as TokenPayload,
    };
  } catch (error: any) {
    throw new AppError(
      500,
      "isUserTokenValid function in token service failed",
      "La vérification du token utilisateur a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Checks if a Json Web Token is valid by verifying the signature with image jwt secret.
 * 
 * @function isImageTokenValid
 * 
 * @param {string} token - The Json Web Token to check.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If an unexpected error occurs during token validity verification.
 */
export function isImageTokenValid(token: string): void {
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_IMAGE_SECRET as string
    );
  } catch (error: any) {
    throw new AppError(
      500,
      "isImageTokenValid function in token service failed",
      "La vérification du token image a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Get the id of the user who sent a token, by checking payload informations.
 * 
 * @function getRequestorId
 * 
 * @param {string} token - The token sotring the user ID.
 * 
 * @returns  {number} The user ID in the token payload.
 * 
 * @throws {AppError} If an unexptected error occurs during token decoding.
 */
export function getRequestorId(token: string): number {
  try {
    const payload = jwt.decode(token);
    return (payload as TokenPayload).id;
  } catch (error: any) {
    throw new AppError(
      500,
      "getRequestorId function in token service failed",
      "Le décodage du token a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}