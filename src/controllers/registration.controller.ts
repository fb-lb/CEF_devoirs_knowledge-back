import { Request, Response } from "express";
import { RegistrationBody, RegistrationResponse} from "../types/Resgistration.js";
import { addUser } from "../services/user.service.js";
import { validateRegistrationForm } from "../services/form.service.js";
import { User } from "../models/databaseAssociations.js";
import { sendEmail } from "../services/email.service.js";

/**
 * User Registration
 * @async@function userRegistration
 * @param {Request} req
 * @param {Response} res
 * @returns
 *
 * A compléter
 *
 */
export async function userRegistration(
  req: Request<{}, {}, RegistrationBody>,
  res: Response<RegistrationResponse<User>>
): Promise<Response<RegistrationResponse<User>>> {
  const body: RegistrationBody = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const validateUserInformations: RegistrationResponse = validateRegistrationForm(body);

  if (!validateUserInformations.success) {
    return res.status(400).json({
      success: false,
      message: validateUserInformations.message,
    });
  }

  try {
    const user: User = await addUser(body);
    const emailSent = await sendEmail(body);
    return res.status(200).json({
      success: true,
      message: `Merci ${user.firstName} ${user.lastName}.\nVous êtes bien inscrit, un mail vous a été envoyé pour activer votre compte.`,
      data: user,
    });
  } catch (error: any) {
    return res.status(error.status).json({
      success: false,
      message:
        error.message ||
        "Une erreur est survenue lors de votre inscription, vous n'êtes pas enregistré pour le moment.",
    });
  }
}
