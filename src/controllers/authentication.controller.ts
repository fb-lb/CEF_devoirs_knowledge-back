import { Request, Response } from "express";
import { ApiResponse, LoginBody } from "../types/Interfaces.js";
import { testLoginRequest } from "../services/authentication.service.js";
import { generateLoginToken } from "../services/token.service.js";
import { User } from "../models/User.js";

export async function login(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response<ApiResponse>> {
  const body: LoginBody = {
    email: req.body.email,
    password: req.body.password
  };

  // Check that email and password are valid
  const user: User|string = await testLoginRequest(body.email, body.password);
  if (typeof(user) === 'string') return res.status(401).json({ success: false, message: user });

  // Generate a token
  const token = generateLoginToken(user);

  // Generate cookies
  res.cookie('token', token, {
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.SECURE_COOKIE_OPTION,
    maxAge: 1000 * 60 * 60 * 24
  })

  return res.status(200).json({success: true, message: ""});
}

export function logout(req: Request, res: Response): Response<ApiResponse> {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: "" });
}