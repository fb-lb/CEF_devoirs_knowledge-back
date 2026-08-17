import { RegistrationBody, UpdateUserBody } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { TEXT_TYPES } from "../models/Text.js";

/**
 * Checks validity of an input text form field.
 * 
 * @function validateTextInputForm
 * 
 * @param {string} value - Input text value
 * @param {boolean} required - Specificy if this input value is required
 * @param {string} fieldName - The input field name used in error message
 * @param {{minLength?: number, maxLength?: number, regex?: RegExp, email?: boolean} | undefined} options - Object containing optional rules for validation {
 *   minLength?: number,
 *   maxLength?: number,
 *   regex?: RegExp,
 *   email?: boolean,
 * }
 * 
 * @returns {void}
 * 
 * @throws {AppError} If value is required and null.
 * @throws {AppError} If value length > maxLength provided.
 * @throws {AppError} If value length < minLength provided.
 * @throws {AppError} If value unauthorized caracters specified by provided regex.
 * @throws {AppError} If value is an email and don't have the right format.
 */
export function validateTextInputForm(value: string, required: boolean, fieldName: string, options?: {
  minLength?: number,
  maxLength?: number,
  regex?: RegExp,
  email?: boolean
}) {
  if (required && !value) throw new AppError(422, "validateTextInputForm function in form service failed because of an invalid form field", `Le champ "${fieldName}" est obligatoire.`);
  if (options?.minLength && value.length < options.minLength) throw new AppError(422, "validateTextInputForm function in form service failed because of an invalid form field", `Le champ "${fieldName}" doit contenir au moins ${options.minLength} caractères.`);
  if (options?.maxLength && value.length > options.maxLength) throw new AppError(422, "validateTextInputForm function in form service failed because of an invalid form field", `Le champ "${fieldName}" doit contenir au maximum ${options.maxLength} caractères.`);
  if (options?.regex && !options.regex.test(value)) throw new AppError(422, "validateTextInputForm function in form service failed because of an invalid form field", `Le champ "${fieldName}" contient des caractères non autorisés.`);
  if (options?.email && (
    !value.includes("@") ||
    !(value.indexOf("@") > 0) ||
    !value.includes(".") ||
    !(value.lastIndexOf(".") > value.indexOf("@") + 1) ||
    !(value.lastIndexOf(".") < value.length - 1)
  )) throw new AppError(422, "validateTextInputForm function in form service failed because of an invalid form field", "Le format email doit être respecté.");
}

/**
 * Checks validity of an input number form field.
 * 
 * @function validateNumberInputForm
 * 
 * @param {string} value - Input number value
 * @param {boolean} required - Specificy if this input value is required
 * @param {string} fieldName - The input field name used in error message
 * @param {{minValue?: number} | undefined} options - Object containing optional rules for validation {
 *   minValue?: number,
 * }
 * 
 * @returns {void}
 * 
 * @throws {AppError} If value is required and null.
 * @throws {AppError} If value < minValue provided.
 */
export function validateNumberInputForm(value: number, required: boolean, fieldName: string, options?: {
  minValue?: number
}) {
  if (required && (value === null || value === undefined)) throw new AppError(422, "validateNumberInputForm function in form service failed because of an invalid form field", `Le champ "${fieldName}" est obligatoire.`);
  if (options?.minValue !== null && options?.minValue !== undefined && value < options?.minValue) throw new AppError(422, "validateNumberInputForm function in form service failed because of an invalid form field", `La valeur de "${fieldName}" doit être supérieure ou égale à ${options.minValue}.`);
}

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
 * @throws {AppError} If password contains unauthorized caracters.
 * @throws {AppError} If confirm password length < 8.
 * @throws {AppError} If confirm password length > 100.
 * @throws {AppError} If confirm password contains unauthorized caracters.
 * @throws {AppError} If password and confirm password are not identical.
 */
export function validateRegistrationForm(body: RegistrationBody): void {
  const formError = new AppError(
    422,
    "validateRegistrationForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(body.firstName, true, "Prénom", {maxLength: 60, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ '\-\.]*$/});
    validateTextInputForm(body.lastName, true, "Nom", {maxLength: 60, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ '\-\.]*$/});
    validateTextInputForm(body.email, true, "Email", {maxLength: 80, email: true});
    validateTextInputForm(body.password, true, "Mot de passe", {minLength: 8, maxLength: 100, regex: /^[a-zA-Z0-9À-ÖØ-öø-ÿŒœ*$%!§\-+&#]*$/});
    validateTextInputForm(body.confirmPassword, true, "Confirmation du mot de passe");
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
  }

  // Test equality between password and confirm password
  if (body.password !== body.confirmPassword) {
    formError.messageFront = 'Les champs "Mot de passe" et "Confirmation du mot de passe" doivent être identiques.';
    throw formError;
  }
}

/**
 * Checks validity of the login form fields.
 * 
 * @function validateLoginForm
 * 
 * @param {RegistrationBody} body - Object containing the user informations {
 *   email: string;
 *   password: string;
 * } 
 * 
 * @returns {void}
 * 
 * @throws {AppError} If one of the body property is null.
 * @throws {AppError} If email format is not followed.
 * @throws {AppError} If email length > 80.
 * @throws {AppError} If password length < 8.
 * @throws {AppError} If password length > 100.
 * @throws {AppError} If password contains unauthorized character.
 */
export function validateLoginForm(body: { email: string; password: string; }): void {
  const formError = new AppError(
    422,
    "validateLoginForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(body.email, true, "Email", {maxLength: 80, email: true});
    validateTextInputForm(body.password, true, "Mot de passe", {minLength: 8, maxLength: 100, regex: /^[a-zA-Z0-9À-ÖØ-öø-ÿŒœ*$%!§\-+&#]*$/});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  const formError = new AppError(
    422,
    "validateUpdateUserForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(body.firstName, true, "Prénom", {maxLength: 60, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ '\-\.]*$/});
    validateTextInputForm(body.lastName, true, "Nom", {maxLength: 60, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ '\-\.]*$/});
    validateTextInputForm(body.email, true, "Email", {maxLength: 80, email: true});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  const formError = new AppError(
    422,
    "validateAddThemeForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(themeName, true, "Nom du thème", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  const formError = new AppError(
    422,
    "validateAddCursusForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(cursusName, true, "Nom du cursus", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
    validateNumberInputForm(price, true, "Prix du cursus", {minValue: 0});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
  }

  if (!themeId) {
    formError.messageFront = "L'identifiant du thème est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw formError;
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
  const formError = new AppError(
    422,
    "validateAddLessonForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(lessonName, true, "Nom de la leçon", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
    validateNumberInputForm(price, true, "Prix de la leçon", {minValue: 0});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
  }

  if (!cursusId) {
    formError.messageFront = "L'identifiant du cursus est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw formError;
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
  const formError = new AppError(
    422,
    "validateAddImageForm function in form service failed because of an invalid form field",
    ""
  );

  if (!source) {
    formError.messageFront = "Le nom du fichier est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw formError;
  }

  if (!lessonId) {
    formError.messageFront = "L'identifiant de la leçon est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw formError;
  }

  // Test source length
  if (source.length > 255) {
    formError.messageFront = `Le nom du fichier est trop long, il doit contenir au maximum 255 caractères. Veuillez contacter le support.`;
    throw formError;
  }

  try {
    validateTextInputForm(alternative, true, "Texte alternatif", {maxLength: 255});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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

  // Test textType value against the allowed values defined on the TEXT_TYPES constant in Text model
  if (!(TEXT_TYPES as unknown as string[]).includes(textType)) {
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
  const formError = new AppError(
    422,
    "validateUpdateThemeForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(newThemeName, true, "Nom du thème", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  const formError = new AppError(
    422,
    "validateUpdateCursusForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(newCursusName, true, "Nom du cursus", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
    validateNumberInputForm(newCursusPrice, true, "Prix du cursus", {minValue: 0});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  const formError = new AppError(
    422,
    "validateUpdateLessonForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(newLessonName, true, "Nom de la leçon", {maxLength: 255, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿŒœ0-9 ?!\/:'"(),\.\-]*$/});
    validateNumberInputForm(newLessonPrice, true, "Prix de la leçon", {minValue: 0});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
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
  if (!(TEXT_TYPES as unknown as string[]).includes(newTextType)) {
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
  const formError = new AppError(
    422,
    "validateUpdateImageForm function in form service failed because of an invalid form field",
    ""
  );

  try {
    validateTextInputForm(newAlternative, true, "Texte alternatif", {maxLength: 255});
  } catch (error) {
    if (error instanceof AppError) {
      formError.messageFront = error.messageFront;
    } else {
      formError.messageFront = "Le formulaire est considéré comme invalide, veuillez contacter le support pour plus d'information.";
      formError.cause = error;
    }
    throw formError;
  }

  if (!newSource) {
    formError.messageFront = "Le nom du fichier est manquant, veuillez contacter le support pour que le problème soit réglé au plus vite.";
    throw formError;
  }

  // Test newSource length
  if (newSource.length > 255) {
    formError.messageFront = `Le nom du fichier est trop long, il doit contenir au maximum 255 caractères. Veuillez contacter le support.`;
    throw formError;
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