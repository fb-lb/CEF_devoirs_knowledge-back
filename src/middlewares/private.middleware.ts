import { NextFunction, Request, Response } from 'express';
import { ApiResponse, MyCheckingPayload } from '../types/Interfaces.js';
import { generateToken, isTokenValid } from '../services/token.service.js';
import { checkAuthorization, setCookies } from '../services/authentication.service.js';

export async function privateUser(req: Request, res: Response, next: NextFunction): Promise<void | Promise<Response<ApiResponse>>> {
  const token = req.cookies.token;
  const user = isTokenValid(token).data as MyCheckingPayload['user'];
  const isAuthorized = await checkAuthorization(user.id, 'user');

  if(isAuthorized) {
    const newToken = generateToken(user);
    setCookies(res, newToken, false);
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Vous n'êtes pas autorisé à accéder à ce contenu." });
  }
}

export async function privateAdmin(req: Request, res: Response, next: NextFunction): Promise<void | Response<ApiResponse>> {
  const token = req.cookies.token;
  const user = isTokenValid(token).data as MyCheckingPayload['user'];
  const isAuthorized = await checkAuthorization(user.id, 'admin');
  
  if(isAuthorized) {
    const newToken = generateToken(user);
    setCookies(res, newToken, true);
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Vous n'êtes pas autorisé à accéder à ce contenu." });
  }
}