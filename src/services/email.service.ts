import emailjs from "@emailjs/nodejs";
import { RegistrationBody } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

/**
 * Send an email to a user to verify his email address and his account.
 * 
 * @async
 * @function sendEmail
 * 
 * @param {RegistrationBody} body - Object containing the user informations {
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   password: string;
 *   confirmPassword: string;
 * }
 * @param {string} token - The token which will be added to a link to verify the email address.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If an unexpected error occurs during email sending. 
 */
export async function sendEmail(
  body: RegistrationBody,
  token: string
): Promise<void> {
  try {
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_API_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_API_KEY,
    });

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        link: process.env.FRONT_URL + (process.env.FRONT_BASE_HREF === 'null' ? '' : process.env.FRONT_BASE_HREF) + "/inscription/check-email/" + token,
      }
    );
  } catch (error: any) {
    throw new AppError(
        500,
        "sendEmail function in email service failed",
        "Nous ne parvenons pas à envoyer le mail de confirmation, veuillez vous inscrire ultérieurement. Si ce problème persiste merci de contacter le support technique.",
        { cause : error }
    );
  }
}
