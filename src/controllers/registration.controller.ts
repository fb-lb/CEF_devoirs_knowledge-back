import { Request, Response } from "express";
import { ApiResponse, MyCheckingPayload, RegistrationBody } from "../types/Interfaces.js";
import { addUser, setIsVerified } from "../services/user.service.js";
import { validateRegistrationForm } from "../services/form.service.js";
import { sendEmail } from "../services/email.service.js";
import { isTokenValid, generateToken } from "../services/token.service.js";

/**
 * Handle user creation.
 *
 * @route POST /api/inscription
 * @param {Request} req - Express request containing the user informations in the body.
 * @param {Response} res - Express response containing the informations of the new user.
 * 
 * @returns {Promise<Response<ApiResponse<MyCheckingPayload['user']>>>} Returns:
 * - 200 with an object containing the new user informations in data property.
 *
 * @description
 * Steps:
 * - Validates the user informations,
 * - Creates the new user,
 * - Generate a token,
 * - Send an email to the user email address with a link containing the token to validate his email address and his account.
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

/**
 * Handle the user email address verification.
 *
 * @route POST /api/inscription/check-email
 * @param {Request} req - Express request containing the user informations in the body.
 * @param {Response} res - Express response containing the informations of the new user.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns: 200.
 *
 * @description
 * Steps:
 * - Checks token validity,
 * - Sets isVerified property to true for the user related to the token.
 */
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
