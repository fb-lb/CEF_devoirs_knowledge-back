import { RegistrationBody, RegistrationResponse } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

// If you modify one of these tests, make sure that User.ts (models) and front end validators are also modified
export function validateRegistrationForm(body: RegistrationBody): void {
  const error = new AppError(
    422,
    "validateRegistrationForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.password ||
    !body.confirmPassword
  ) {
    error.messageFront = 'Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.';
    throw error;
  }

  // Test firstName length
  if (body.firstName.length > 60) {
    error.messageFront = 'Le champ "Prénom" doit contenir au maximum 60 caractères.';
    throw error;
  }

  // Test lastName length
  if (body.lastName.length > 60) {
    error.messageFront = 'Le champ "Nom" doit contenir au maximum 60 caractères.';
    throw error;
  }

  // Test firstName special caracters
  const regex = /^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/;
  if (!regex.test(body.firstName)) {
    error.messageFront = 'Le champ "Prénom" contient des caractères non autorisés.';
    throw error;
  }

  // Test lastName special caracters
  if (!regex.test(body.lastName)) {
    error.messageFront = 'Le champ "Nom" contient des caractères non autorisés.';
    throw error;
  }

  // Test email format
  const email = body.email;
  if (
    !email.includes("@") ||
    !(email.indexOf("@") > 0) ||
    !email.includes(".") ||
    !(email.lastIndexOf(".") > email.indexOf("@") + 1) ||
    !(email.lastIndexOf(".") < email.length - 1)
  ) {
    error.messageFront = "Le format email doit être respecté.";
    throw error;
  }

  // Test email length
  if (body.email.length > 80) {
    error.messageFront = 'Le champ "Email" doit contenir au maximum 80 caractères.';
    throw error;
  }

  // Test password length
  if (body.password.length < 8) {
    error.messageFront= 'Le champ "Mot de passe" doit contenir au moins 8 caractères.';
    throw error;
  }

  if (body.password.length > 100) {
    error.messageFront = 'Le champ "Mot de passe" doit contenir au maximum 100 caractères.';
    throw error;
  }

  // Test confirmPassword length
  if (body.confirmPassword.length < 8) {
    error.messageFront = 'Le champ "Confirmation du mot de passe" doit contenir au moins 8 caractères.';
    throw error;
  }

  if (body.confirmPassword.length > 100) {
    error.messageFront= 'Le champ "Confirmation du mot de passe" doit contenir au maximum 100 caractères.';
    throw error;
  }

  // Test equality between password and confirm password
  if (body.password !== body.confirmPassword) {
    error.messageFront = 'Les champs "Mot de passe" et "Confirmation du mot de passe" doivent être identiques.';
    throw error;
  }
}
