import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from 'bcrypt';

export async function testLoginRequest(email: string, password: string): Promise<User|string> {
  try {
    const user = await User.findOne(
      { where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified']
    });

    if (!user) return 'Cet email ne correspond à aucun compte enregistré.';
    
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) return 'Email et/ou mot de passe invalide.';

    return user;  
  } catch (error: any) {
    throw new AppError(
      500,
      "internal server error",
      "Une erreur interne est survenue, si vous ne parvenez pas à vous connecter, merci de contacter le support.",
      { cause : error }
    )
  }
}