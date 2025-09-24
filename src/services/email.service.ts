import emailjs from "@emailjs/nodejs";
import { RegistrationBody } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

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
        link: process.env.FRONT_URL + "/inscription/check-email/" + token,
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
