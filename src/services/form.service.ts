import { RegistrationBody, UpdateUserBody } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

/**
 * Checks validity of the registration form fields.
 * 
 * @function validateRegistrationForm
 * 
 * @param {RegistrationBody} body - Object containing the user informations {
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   password: string;
 *   confirmPassword: string;
 * } 
 * 
 * @returns {void}
 * 
 * @throws {AppError} If one of the body property is null.
 * @throws {AppError} If first name length > 60.
 * @throws {AppError} If last name length > 60.
 * @throws {AppError} If first name contains unauthorized caracters.
 * @throws {AppError} If last name contains unauthorized caracters.
 * @throws {AppError} If email format is not followed.
 * @throws {AppError} If email length > 80.
 * @throws {AppError} If password length < 8.
 * @throws {AppError} If password length > 100.
 * @throws {AppError} If confirm password length < 8.
 * @throws {AppError} If confirm password length > 100.
 * @throws {AppError} If password and confirm password are not identical.
 */
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

/**
 * Checks validity of the update user form fields.
 * 
 * @function validateUpdateUserForm
 * 
 * @param {RegistrationBody} body - Object containing the user informations {
 *   id: number;
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   roles: ("user" | "admin")[];
 *   isVerified: boolean;
 * }
 * 
 * @returns {void}
 * 
 * @throws {AppError} If at least one of the id, firstname, lastname or email body properties is null.
 * @throws {AppError} If id value < 1.
 * @throws {AppError} If id length > 20.
 * @throws {AppError} If first name length > 60.
 * @throws {AppError} If last name length > 60.
 * @throws {AppError} If first name contains unauthorized caracters.
 * @throws {AppError} If last name contains unauthorized caracters.
 * @throws {AppError} If email format is not followed.
 * @throws {AppError} If email length > 80.
 */
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

/**
 * Checks validity of the add theme form fields.
 * 
 * @function validateAddThemeForm
 * 
 * @param {string} themeName - The name of the new theme.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If theme name is null.
 * @throws {AppError} If theme name length > 255.
 * @throws {AppError} If theme name contains unauthorized caracters.
 */
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

/**
 * Checks validity of the add cursus form fields.
 * 
 * @function validateAddCursusForm
 * 
 * @param {string} cursusName - The name of the new cursus.
 * @param {number} themeId - The ID of the theme containing the cursus.
 * @param {number} price - The price of the cursus.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If cursus name or price is null.
 * @throws {AppError} If theme id is null.
 * @throws {AppError} If cursus name length > 255.
 * @throws {AppError} If cursus name contains unauthorized caracters.
 * @throws {AppError} If price value < 0.
 */
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

/**
 * Checks validity of the add lesson form fields.
 * 
 * @function validateAddLessonForm
 * 
 * @param {string} lessonName - The lesson name.
 * @param {number} cursusId - The ID of the cursus containing the lesson.
 * @param {number} price - The price of the lesson.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If lesson name or price is null.
 * @throws {AppError} If cursus id is null.
 * @throws {AppError} If lesson name length > 255.
 * @throws {AppError} If lesson name contains unauthorized caracters.
 * @throws {AppError} If price value < 0.
 */
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

/**
 * Checks validity of the add image form fields.
 * 
 * @function validateAddImageForm
 * 
 * @param {string} source - The file name.
 * @param {string} alternative - The alternative text used for the image alternative attribut.
 * @param {number} lessonId - The ID of the lesson containing the image.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If alternative is null.
 * @throws {AppError} If source is null.
 * @throws {AppError} If lesson id is null.
 * @throws {AppError} If source length > 255.
 * @throws {AppError} If alternative length > 255.
 */
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

/**
 * Checks validity of the add text form fields.
 * 
 * @function validateAddTextForm
 * 
 * @param {string} textType - The type of the text.
 * @param {string} content - The text displayed on front-end.
 * @param {number} lessonId - The ID of the lesson containing the text.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If content is null.
 * @throws {AppError} If text type is null.
 * @throws {AppError} If lesson id is null.
 * @throws {AppError} If text type is not an allowed value : 'title1' || 'title2' || 'title3' || 'paragraph'.
 */
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

/**
 * Checks validity of the update theme form.
 * 
 * @function validateUpdateThemeForm
 * 
 * @param {string} newThemeName - The new name of the theme.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If new theme name is null.
 * @throws {AppError} If theme name length > 255.
 * @throws {AppError} If theme name contains a caracter not allowed.
 */
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

/**
 * Checks validity of the update cursus form.
 * 
 * @function validateUpdateCursusForm
 * 
 * @param {string} newCursusName - The new name of the cursus.
 * @param {number} newCursusPrice - The new price of the cursus.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If new cursus name or new cursus price is null.
 * @throws {AppError} If cursus name length > 255.
 * @throws {AppError} If cursus name contains a caracter not allowed.
 * @throws {AppError} If cursus price value < 0. 
 */
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

/**
 * Checks validity of the update lesson form.
 * 
 * @function validateUpdateLessonForm
 * 
 * @param {string} newLessonName - The new name of the lesson.
 * @param {number} newLessonPrice - The new price of the lesson.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If new lesson name or new lesson price is null.
 * @throws {AppError} If lesson name length > 255.
 * @throws {AppError} If lesson name contains a caracter not allowed.
 * @throws {AppError} If lesson price value < 0. 
 */
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

/**
 * Checks validity of the update text form.
 * 
 * @function validateUpdateTextForm
 * 
 * @param {string} newTextType - The new type  of the text.
 * @param {string} newContent - The new content of the text.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If new text type is null.
 * @throws {AppError} If new text content is null.
 * @throws {AppError} If new text type value is not allowed : 'title1' | 'title2' | 'title3' | 'paragraph'.
 */
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

/**
 * Checks validity of the update image form.
 * 
 * @function validateUpdateImageForm
 * 
 * @param {string} newSource - The new file name of the image.
 * @param {string} newAlternative - The new alternative text for the image alternative attribut.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If new alternative of the image is null.
 * @throws {AppError} If new source of the image is null.
 * @throws {AppError} If new source length > 255.
 * @throws {AppError} If new alternative length > 255.
 */
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

/**
 * Checks validity of the update user-theme form.
 * 
 * @function validateUpdateUserThemeForm
 * 
 * @param {number} userThemeId - The ID of the user-theme to update.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If the user-theme ID is null or not a number.
 * @throws {AppError} If the requestor ID is null or not a number.
 * @throws {AppError} If the user-theme ID value < 1.
 * @throws {AppError} If the requestor ID value < 1.
 */
export function validateUpdateUserThemeForm(userThemeId: number, requestorId: number): void {
  const error = new AppError(
    422,
    "validateUpdateUserThemeForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if(!userThemeId || Number.isNaN(userThemeId)) {
    error.messageFront = `Le champ "Identifiant de l'association utilisateur / thème" est obligatoire et doit être un nombre.`;
    throw error;
  }

  if(!requestorId || Number.isNaN(requestorId)) {
    error.messageFront = 'Un problème est survenu, nous faisons tout pour le solutionner.';
    throw error;
  }

  // Test minimal value validator
  if (userThemeId < 1) {
    error.messageFront = "L'identifiant de l'association utilisateur / thème doit être supérieur ou égal à 1.";
    throw error;
  }

  if (requestorId < 1) {
    error.messageFront = 'Un problème est survenu, nous faisons tout pour le solutionner.';
    throw error;
  }
}

/**
 * Checks validity of the update user-cursus form.
 * 
 * @function validateUpdateUserCursusForm
 * 
 * @param {number} userCursusId - The ID of the user-cursus to update.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If the user-cursus ID is null or not a number.
 * @throws {AppError} If the requestor ID is null or not a number.
 * @throws {AppError} If the user-cursus ID value < 1.
 * @throws {AppError} If the requestor ID value < 1.
 */
export function validateUpdateUserCursusForm(userCursusId: number, requestorId: number): void {
  const error = new AppError(
    422,
    "validateUpdateUserCursusForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if(!userCursusId || Number.isNaN(userCursusId)) {
    error.messageFront = `Le champ "Identifiant de l'association utilisateur / cursus" est obligatoire et doit être un nombre.`;
    throw error;
  }

  if(!requestorId || Number.isNaN(requestorId)) {
    error.messageFront = "Un problème est survenu, nous mettons tout en oeuvre pour le solutionner au plus vite.";
    throw error;
  }

  // Test minimal value validator
  if (userCursusId < 1) {
    error.messageFront = "L'identifiant de l'association utilisateur / cursus doit être supérieur ou égal à 1.";
    throw error;
  }

  if (requestorId < 1) {
    error.messageFront = "Un problème est survenu, nous mettons tout en oeuvre pour le solutionner au plus vite.";
    throw error;
  }
}

/**
 * Checks validity of the update user-lesson form.
 * 
 * @function validateUpdateUserLessonForm
 * 
 * @param {number} userLessonId - The ID of the user-lesson to update.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {void}
 * 
 * @throws {AppError} If the user-lesson ID is null or not a number.
 * @throws {AppError} If the requestor ID is null or not a number.
 * @throws {AppError} If the user-lesson ID value < 1.
 * @throws {AppError} If the requestor ID value < 1.
 */
export function validateUpdateUserLessonForm(userLessonId: number, requestorId: number) {
  const error = new AppError(
    422,
    "validateUpdateUserLessonForm function in form service failed because of an invalid form field",
    ""
  );

  // Test required validator
  if(!userLessonId || Number.isNaN(userLessonId)) {
    error.messageFront = `Le champ "Identifiant de l'association utilisateur / leçon" est obligatoire et doit être un nombre.`;
    throw error;
  }

  if(!requestorId || Number.isNaN(requestorId)) {
    error.messageFront = "Un problème est survenu, nous mettons tout en oeuvre pour le solutionner.";
    throw error;
  }

  // Test minimal value validator
  if (userLessonId < 1) {
    error.messageFront = "L'identifiant de l'association utilisateur / leçon doit être supérieur ou égal à 1.";
    throw error;
  }

  if (requestorId < 1) {
    error.messageFront = "Un problème est survenu, nous mettons tout en oeuvre pour le solutionner.";
    throw error;
  }
}