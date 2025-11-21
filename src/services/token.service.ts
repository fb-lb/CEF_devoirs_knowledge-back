import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import {
  ApiResponse,
  MyCheckingPayload,
} from "../types/Interfaces.js";

/**
 * Generate a Json Web Token.
 * 
 * @async
 * @function generateToken
 * 
 * @param {MyCheckingPayload['user']} user - The token payload.
 * 
 * @returns {string} The Json Web Token generated.
 */
export function generateToken(user: MyCheckingPayload['user']): string {
  const token = jwt.sign({user: user}, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  return token;
}

/**
 * Checks if a Json Web Token is valid by verifying the signature.
 * 
 * @async
 * @function isTokenValid
 * 
 * @param {string} token - The Json Web Token to check.
 * 
 * @returns {ApiResponse<MyCheckingPayload['user']>} Success: true, message: "", data: the token payload containing the user informations.
 * 
 * @throws {AppError} If an unexpected error occurs during token validity verification.
 */
export function isTokenValid(token: string): ApiResponse<MyCheckingPayload['user']> {
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

/**
 * Get the id of the user who sent a token, by checking payload informations.
 * 
 * @async
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