import { Request, Response } from "express";
import { ApiResponse, LoginBody, MyCheckingPayload } from "../types/Interfaces.js";
import { setCookies, testLoginRequest } from "../services/authentication.service.js";
import { generateToken } from "../services/token.service.js";

export async function login(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response<ApiResponse>> {
  const body: LoginBody = {
    email: req.body.email,
    password: req.body.password
  };

  // Check that email and password are valid
  const user: MyCheckingPayload['user']|string = await testLoginRequest(body.email, body.password);
  if (typeof(user) === 'string') return res.status(401).json({ success: false, message: user });

  // Check user is verfied
  if(!user.isVerified) return res.status(401).json({ success: false, message: "Veuillez confirmer votre adresse mail avant de vous connecter" });

  // Generate a token
  const token = generateToken(user);

  // Generate cookies
  const isAdmin = user.roles.includes('admin');
  setCookies(res, token, isAdmin);

  return res.status(200).json({success: true, message: ""});
}

export function logout(req: Request, res: Response): Response<ApiResponse> {
  res.clearCookie('token');
  res.clearCookie('isAuth');
  res.clearCookie('isAdmin');
  return res.status(200).json({ success: true, message: "" });
}