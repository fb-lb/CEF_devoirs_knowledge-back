import bcrypt from "bcrypt";
import { RegistrationBody, AddUser } from "../types/Resgistration.js";
import { User } from "../models/databaseAssociations.js";
import { AppError } from "../utils/AppError.js";

export async function addUser(body: RegistrationBody): Promise<User> {
  try {
    const { confirmPassword, ...userData } = body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await User.create(userData as AddUser);
    return newUser;
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
        throw new AppError("Ce mail est déjà utilisé par un compte enregistré, veuillez utiliser un autre mail.",409);
    }
    throw new AppError("Un problème interne a eu lieu, nous ne parvenons pas à vous enregistrer dans notre base de données.",500);
  }
}
