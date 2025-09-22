import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";
import { RegistrationBody } from "../types/Resgistration.js";
import { AppError } from "../utils/AppError.js";

export async function sendEmail(body: RegistrationBody) {
    try {
        emailjs.init({
            publicKey: process.env.EMAILJS_PUBLIC_API_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_API_KEY,
        });

        await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            link: "https://www.npmjs.com/package/@emailjs/nodejs",
        });
    } catch (error: any) {
        if(error instanceof EmailJSResponseStatus) {
            throw new AppError('EmailJS failed : ' + error.text, error.status);
        }
        throw new AppError('sendEmail error : ' + error, 500);
    }
}