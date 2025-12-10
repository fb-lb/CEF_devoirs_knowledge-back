import { Request, Response } from "express";
import { ApiResponse, LoginBody, MyCheckingPayload } from "../types/Interfaces.js";
import { setCookies, testLoginRequest } from "../services/authentication.service.js";
import { generateToken } from "../services/token.service.js";
import { validateLoginForm } from "../services/form.service.js";

/**
 * Handle user login request.
 *
 * @route POST /api/authentification/connexion
 * @param {Request} req - Express request containing email and password in the body.
 * @param {Response} res - Express response.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns:
 * - 200 if login is successful (token + cookies set).
 * - 401 if credentials are invalid or user email is not verified.
 *
 * @description
 * Steps:
 * - Validate credentials via `testLoginRequest`,
 * - Generate a JWT token,
 * - Set cookies (token + role flag).
 */
export async function login(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response<ApiResponse>> {
  const body: LoginBody = {
    email: req.body.email,
    password: req.body.password
  };

  validateLoginForm(body);

  // Check that email and password are valid
  const user: MyCheckingPayload['user']|string = await testLoginRequest(body.email, body.password);
  if (typeof(user) === 'string') return res.status(401).json({ success: false, message: user });

  // Generate a token
  const token = generateToken(user);

  // Generate cookies
  const isAdmin = user.roles.includes('admin');
  setCookies(res, token, isAdmin);

  return res.status(200).json({success: true, message: ""});
}

/**
 * Handle user logout request.
 * 
 * @route GET /api/authentification/deconnexion
 * @param {Request} req - Express request. 
 * @param {Response} res - Express response.
 *  
 * @returns {Response<ApiResponse>} Returns :
 * - 200 if logout is successful (token, isAuth, isAdmin cookies are cleared).
 * 
 * @description
 * Steps :
 * - Clear token, isAuth, isAdmin cookies.
 */
export function logout(req: Request, res: Response): Response<ApiResponse> {
  res.clearCookie('token');
  res.clearCookie('isAuth');
  res.clearCookie('isAdmin');
  return res.status(200).json({ success: true, message: "" });
}