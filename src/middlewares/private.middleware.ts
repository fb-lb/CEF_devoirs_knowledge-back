import { NextFunction, Request, Response } from 'express';
import { ApiResponse, MyCheckingPayload } from '../types/Interfaces.js';
import { generateToken, isTokenValid } from '../services/token.service.js';
import { checkAuthorization, setCookies } from '../services/authentication.service.js';

/**
 * Verifies that the request is sent by a user registered in the database by checking the token.
 * 
 * @async
 * @function privateUser
 * 
 * @param {Request} req - Request received from the front-end, where the token is stored.
 * @param {Response} res - Response to send to the front-end in case the user is not a user.
 * @param {NextFunction} next - Used to go on the next middleware.
 * 
 * @returns {Promise<void | Promise<Response<ApiResponse>>>} Returns `Promise<void>` if requestor has `user` in his roles property.
 * Returns `Promise<Promise<Response<ApiResponse>>>` user has not `user` in his roles property.
 */
export async function privateUser(req: Request, res: Response, next: NextFunction): Promise<void | Promise<Response<ApiResponse>>> {
  const token = req.cookies.token;
  const user = isTokenValid(token).data as MyCheckingPayload['user'];
  const isAuthorized = await checkAuthorization(user.id, 'user');

  if(isAuthorized) {
    req.user = { id: user.id };
    const newToken = generateToken(user);
    setCookies(res, newToken, false);
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Vous n'êtes pas autorisé à accéder à ce contenu." });
  }
}

/**
 * Verifies that the request is sent by a user registered in the database with `admin` in his roles property.
 * 
 * @async
 * @function privateAdmin
 * 
 * @param {Request} req - Request received from the front-end, where the token is stored.
 * @param {Response} res - Response to send to the front-end in case the user is not an admin.
 * @param {NextFunction} next - Used to go on the next middleware.
 * 
 * @returns {Promise<void | Promise<Response<ApiResponse>>>} Returns `Promise<void>` if requestor has `admin` in his roles property.
 * Returns `Promise<Promise<Response<ApiResponse>>>` user has not `admin` in his roles property.
 */
export async function privateAdmin(req: Request, res: Response, next: NextFunction): Promise<void | Response<ApiResponse>> {
  const token = req.cookies.token;
  const user = isTokenValid(token).data as MyCheckingPayload['user'];
  const isAuthorized = await checkAuthorization(user.id, 'admin');

  if(isAuthorized) {
    req.user = { id: user.id };
    const newToken = generateToken(user);
    setCookies(res, newToken, true);
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Vous n'êtes pas autorisé à accéder à ce contenu." });
  }
}