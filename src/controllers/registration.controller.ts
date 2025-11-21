import { Request, Response } from "express";
import { ApiResponse, MyCheckingPayload, RegistrationBody } from "../types/Interfaces.js";
import { addUser, setIsVerified } from "../services/user.service.js";
import { validateRegistrationForm } from "../services/form.service.js";
import { sendEmail } from "../services/email.service.js";
import { isTokenValid, generateToken } from "../services/token.service.js";

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
  res: Response<ApiResponse<MyCheckingPayload['user']>>
): Promise<Response<ApiResponse<MyCheckingPayload['user']>>> {
  const body: RegistrationBody = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  validateRegistrationForm(body);
  const user: MyCheckingPayload['user'] = await addUser(body);
  const token: string = generateToken(user);
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
): Promise<Response<ApiResponse>> {
  // Check the token is valid
  const token: string = req.body.token;
  const user = isTokenValid(token).data as MyCheckingPayload['user'];

  // Set isVerified to true for this user
  await setIsVerified(user.id);

  return res.status(200).json({
    success: true,
    message: "Votre mail a bien été validé, vous pouvez désormais vous connecter à votre compte personnel avec vos identifiants.",
  });
}
