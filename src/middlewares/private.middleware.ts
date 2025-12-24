import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../types/Interfaces.js";
import { generateUserToken, isUserTokenValid } from "../services/token.service.js";
import { checkAuthorization } from "../services/authentication.service.js";
import { AppError } from "../utils/AppError.js";
import { getUser } from "../services/user.service.js";

/**
 * Verifies that the request is sent by a user registered in the database by checking the token.
 *
 * @async
 * @function privateUser
 *
 * @param {Request} req - Request received from the front-end, where the token is stored.
 * @param {Response} res - Response where cookies are saved if user is connected.
 * @param {NextFunction} next - Used to go on the next middleware.
 *
 * @returns {Promise<void>}
 *
 * @throws {AppError} If requestor is not connected as a user.
 */
export async function privateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new AppError(
        401,
        "Content only available to connected user : authorization header not provided",
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    const [type, token] = authHeader.split(" ");

    if (type?.toLowerCase() !== "bearer" || !token)
      throw new AppError(
        401,
        'Content only available to connected user : autorization header format must be "Bearer token"',
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    const userPayload = isUserTokenValid(token).data as TokenPayload;
    const isAuthorized = await checkAuthorization(userPayload.id, "user");

    if (!isAuthorized)
      throw new AppError(
        401,
        "Content only available to connected user : not authorized",
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    req.user = { id: userPayload.id };
    const user = await getUser(userPayload.id);
    const newToken = generateUserToken(user);
    res.setHeader("Authorization", `Bearer ${newToken}`);
    return next();
  } catch (error) {
    return next(error);
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
export async function privateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new AppError(
        401,
        "Content only available to connected admin : authorization header not provided",
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    const [type, token] = authHeader.split(" ");

    if (type?.toLowerCase() !== "bearer" || !token)
      throw new AppError(
        401,
        'Content only available to connected admin : autorization header format must be "Bearer token"',
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    const userPayload = isUserTokenValid(token).data as TokenPayload;

    const isAuthorized = await checkAuthorization(userPayload.id, "admin");

    if (!isAuthorized)
      throw new AppError(
        401,
        "Content only available to connected admin : not authorized",
        "Vous n'êtes pas autorisé à accéder à ce contenu."
      );

    req.user = { id: userPayload.id };
    const user = await getUser(userPayload.id);
    const newToken = generateUserToken(user);
    res.setHeader("Authorization", `Bearer ${newToken}`);
    return next();
  } catch (error) {
    return next(error);
  }
}
