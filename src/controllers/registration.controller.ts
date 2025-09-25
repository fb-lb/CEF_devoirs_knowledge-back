import { Request, Response } from "express";
import { RegistrationBody, RegistrationResponse } from "../types/Interfaces.js";
import { addUser, setIsVerified } from "../services/user.service.js";
import { validateRegistrationForm } from "../services/form.service.js";
import { User } from "../models/databaseAssociations.js";
import { sendEmail } from "../services/email.service.js";
import { checkEmailToken, generateEmailToken } from "../services/token.service.js";
import { AppError } from "../utils/AppError.js";

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

  validateRegistrationForm(body);

  const user: User = await addUser(body);

  const token: string = await generateEmailToken(body.email);

  await sendEmail(body, token);

  return res.status(200).json({
    success: true,
    message: `Merci ${user.firstName} ${user.lastName}.\nVous êtes bien inscrit, un mail vous a été envoyé pour activer votre compte.\nVeuillez activer votre compte pour pouvoir vous connecter.`,
    data: user,
  });
}

export async function checkEmail(
  req: Request,
  res: Response
): Promise<Response<RegistrationResponse>> {
  // Check the token is valid
  const token: string = req.body.token;
  const checkTokenResponse: RegistrationResponse<number> = checkEmailToken(token);

  // Set isVerified to true for this user
  let verifiedUserResponse: RegistrationResponse;
  if (checkTokenResponse.data !== undefined) {
    verifiedUserResponse = await setIsVerified(checkTokenResponse.data);
  } else {
    throw new AppError(
      400,
      "checkmail function in registration controller failed because checkEmailToken function (in token service) returned undefined for data property",
      "Nous n'avons pas pu mettre à jour votre compte, veuilez réessayer ultérieurement ou contacter le support."
    );
  }

  return res.status(200).json({
    success: true,
    message: "Votre mail a bien été validé, vous pouvez désormais vous connecter à votre compte personnel avec vos identifiants.",
  });
}
