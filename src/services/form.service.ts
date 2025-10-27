import { RegistrationBody, RegistrationResponse, UpdateUserBody } from "../types/Interfaces.js";
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

export function validateUpdateUserForm(body: UpdateUserBody): void {
  const error = new AppError(
    422,
    "validateUpdateUserForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (
    !body.id ||
    !body.firstName ||
    !body.lastName ||
    !body.email
  ) {
    error.messageFront = 'Les champs "Identifiant", "Nom", "Prénom" et "Email" sont obligatoires.';
    throw error;
  }

  // Test id value
  if (body.id < 1) {
    error.messageFront = `La valeur du champ "Identifiant" doit être d'au moins 1.`;
    throw error;
  }

  // Test id length
  if (body.id.toLocaleString.length > 20) {
    error.messageFront = `Le champ "Identifiant" doit contenir au maximum 20 caractères.`;
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
}

export function validateAddThemeForm(themeName: string): void {
  const error = new AppError(
    422,
    "validateAddThemeForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!themeName) {
    error.messageFront = 'Le champ "Nom du thème" est obligatoire.';
    throw error;
  }

  // Test themeName length
  if (themeName.length > 255) {
    error.messageFront = `Le champ "Nom du thème" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test themeName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(themeName)) {
    error.messageFront = 'Le champ "Nom du thème" contient des caractères non autorisés.';
    throw error;
  }
}

export function validateAddCursusForm(cursusName: string, themeId: number, price: number): void {
  const error = new AppError(
    422,
    "validateAddCursusForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!cursusName || !price) {
    error.messageFront = 'Les champs "Nom du cursus" et "Prix du cursus" sont obligatoires.';
    throw error;
  }

  if (!themeId) {
    error.messageFront = "L'identifiant du thème est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test cursusName length
  if (cursusName.length > 255) {
    error.messageFront = `Le champ "Nom du cursus" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test cursusName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(cursusName)) {
    error.messageFront = 'Le champ "Nom du cursus" contient des caractères non autorisés.';
    throw error;
  }

  // Test price value
  if (price < 0) {
    error.messageFront = 'Le prix doit être positif.';
    throw error;
  }
}

export function validateAddLessonForm(lessonName: string, cursusId: number, price: number): void {
  const error = new AppError(
    422,
    "validateAddLessonForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!lessonName || !price) {
    error.messageFront = 'Les champs "Nom de la leçon" et "Prix de la leçon" sont obligatoires.';
    throw error;
  }

  if (!cursusId) {
    error.messageFront = "L'identifiant du cursus est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test lessonName length
  if (lessonName.length > 255) {
    error.messageFront = `Le champ "Nom de la leçon" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test lessonName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(lessonName)) {
    error.messageFront = 'Le champ "Nom de la leçon" contient des caractères non autorisés.';
    throw error;
  }

  // Test price value
  if (price < 0) {
    error.messageFront = 'Le prix doit être positif.';
    throw error;
  }
}

export function validateAddImageForm(source: string, alternative: string, lessonId: number): void {
  const error = new AppError(
    422,
    "validateAddImageForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!alternative) {
    error.messageFront = 'Le champ "Texte alternatif" est obligatoire.';
    throw error;
  }

  if (!source) {
    error.messageFront = "Le nom du fichier est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  if (!lessonId) {
    error.messageFront = "L'identifiant de la leçon est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test source length
  if (source.length > 255) {
    error.messageFront = `Le nom du fichier est trop long, il doit contenir au maximum 255 caractères. Veuillez contacter le support.`;
    throw error;
  }

  // Test alternative length
  if (alternative.length > 255) {
    error.messageFront = `Le champ "Alternative" doit contenir au maximum 255 caractères.`;
    throw error;
  }
}

export function validateAddTextForm(textType: string, content: string, lessonId: number): void {
  const error = new AppError(
    422,
    "validateAddTextForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!content) {
    error.messageFront = 'Le champ contenant le texte est obligatoire.';
    throw error;
  }

  if (!textType) {
    error.messageFront = "La nature du texte est manquante (titre1, 2, 3 ou paragraphe), veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  if (!lessonId) {
    error.messageFront = "L'identifiant de la leçon est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test textType value
  if (textType !== 'title1' && textType !== 'title2' && textType !== 'title3' && textType !== 'paragraph') {
    error.messageFront = `Le type du texte n'est pas valide. Veuillez contacter le support.`;
    throw error;
  }
}

export function validateUpdateThemeForm(newThemeName: string): void {
  const error = new AppError(
    422,
    "validateUpdateThemeForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!newThemeName) {
    error.messageFront = 'Le champ "Nom du thème" est obligatoire.';
    throw error;
  }

  // Test newThemeName length
  if (newThemeName.length > 255) {
    error.messageFront = `Le champ "Nom du thème" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test newThemeName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(newThemeName)) {
    error.messageFront = 'Le champ "Nom du thème" contient des caractères non autorisés.';
    throw error;
  }
}

export function validateUpdateCursusForm(newCursusName: string, newCursusPrice: number): void {
  const error = new AppError(
    422,
    "validateUpdateCursusForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!newCursusName || !newCursusPrice) {
    error.messageFront = 'Les champs "Nom du cursus" et "Prix du cursus" sont obligatoires.';
    throw error;
  }

  // Test newCursusName length
  if (newCursusName.length > 255) {
    error.messageFront = `Le champ "Nom du cursus" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test newCursusName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(newCursusName)) {
    error.messageFront = 'Le champ "Nom du cursus" contient des caractères non autorisés.';
    throw error;
  }

  // Test newCursusPrice value
  if (newCursusPrice < 0) {
    error.messageFront = 'Le prix doit être positif.';
    throw error;
  }
}

export function validateUpdateLessonForm(newLessonName: string, newLessonPrice: number): void {
  const error = new AppError(
    422,
    "validateUpdateLessonForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!newLessonName || !newLessonPrice) {
    error.messageFront = 'Les champs "Nom de la leçon" et "Prix de la leçon" sont obligatoires.';
    throw error;
  }

  // Test newLessonName length
  if (newLessonName.length > 255) {
    error.messageFront = `Le champ "Nom de la leçon" doit contenir au maximum 255 caractères.`;
    throw error;
  }

  // Test newLessonName special caracters
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/;
  if (!regex.test(newLessonName)) {
    error.messageFront = 'Le champ "Nom de la leçon" contient des caractères non autorisés.';
    throw error;
  }

  // Test newLessonPrice value
  if (newLessonPrice < 0) {
    error.messageFront = 'Le prix doit être positif.';
    throw error;
  }
}

export function validateUpdateTextForm(newTextType: string, newContent: string): void {
  const error = new AppError(
    422,
    "validateUpdateTextForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!newContent) {
    error.messageFront = 'Le champ contenant le texte est obligatoire.';
    throw error;
  }

  if (!newTextType) {
    error.messageFront = "La nature du texte est manquante (titre1, 2, 3 ou paragraphe), veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test newTextType value
  if (newTextType !== 'title1' && newTextType !== 'title2' && newTextType !== 'title3' && newTextType !== 'paragraph') {
    error.messageFront = `Le type du texte n'est pas valide. Veuillez contacter le support.`;
    throw error;
  }
}

export function validateUpdateImageForm(newSource: string, newAlternative: string): void {
  const error = new AppError(
    422,
    "validateUpdateImageForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if (!newAlternative) {
    error.messageFront = 'Le champ "Texte alternatif" est obligatoire.';
    throw error;
  }

  if (!newSource) {
    error.messageFront = "Le nom du fichier est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw error;
  }

  // Test newSource length
  if (newSource.length > 255) {
    error.messageFront = `Le nom du fichier est trop long, il doit contenir au maximum 255 caractères. Veuillez contacter le support.`;
    throw error;
  }

  // Test newAlternative length
  if (newAlternative.length > 255) {
    error.messageFront = `Le champ "Alternative" doit contenir au maximum 255 caractères.`;
    throw error;
  }
}