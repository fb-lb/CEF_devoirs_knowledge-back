import { Request, Response } from "express";
import { ApiResponse, LoginBody, UserData } from "../types/Interfaces.js";
import { testLoginRequest } from "../services/authentication.service.js";
import { generateUserToken } from "../services/token.service.js";
import { validateLoginForm } from "../services/form.service.js";

/**
 * Handle user login request.
 *
 * @route POST /api/authentification/connexion
 * @param {Request} req - Express request containing email and password in the body.
 * @param {Response} res - Express response.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns:
 * - 200 if login is successful (token + Authorization header set).
 * - 401 if credentials are invalid or user email is not verified.
 *
 * @description
 * Steps:
 * - Validate credentials via `testLoginRequest`,
 * - Generate a JWT token,
 * - Set Authorization header (token).
 */
export async function login(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response<ApiResponse>> {
  const body: LoginBody = {
    email: req.body.email,
    password: req.body.password
  };

  validateLoginForm(body);

  // Check that email and password are valid
  const user: UserData|string = await testLoginRequest(body.email, body.password);
  if (typeof(user) === 'string') return res.status(401).json({ success: false, message: user });

  // Generate a token
  const token = generateUserToken(user);

  // Set Authorization header
  const isAdmin = user.roles.includes('admin');
  res.setHeader('Authorization', `Bearer ${token}`);

  return res.status(200).json({success: true, message: ""});
}