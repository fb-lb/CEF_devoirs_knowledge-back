import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { Response } from "express";
import bcrypt from 'bcrypt';
import { MyCheckingPayload } from "../types/Interfaces.js";

export async function testLoginRequest(email: string, password: string): Promise<MyCheckingPayload['user']|string> {
  try {
    const user = await User.findOne(
      { where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified']
    });

    if (!user) return 'Cet email ne correspond à aucun compte enregistré.';
    
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) return 'Email et/ou mot de passe invalide.';

    const { password: _, ...cleanUser } = user.get({ plain: true });

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

export function setCookies(res: Response, token: string, isAdmin: boolean): Response {
  res.cookie('token', token, {
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.SECURE_COOKIE_OPTION,
    maxAge: 1000 * 60 * 60 * 24
  });

  res.cookie('isAuth', true, {
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.SECURE_COOKIE_OPTION,
    maxAge: 1000 * 60 * 60 * 24
  })

  if (isAdmin) res.cookie('isAdmin', true, {
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.SECURE_COOKIE_OPTION,
    maxAge: 1000 * 60 * 60 * 24
  })

  return res;
}

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