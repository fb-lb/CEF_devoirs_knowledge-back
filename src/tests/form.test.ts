import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateLoginForm, validateRegistrationForm } from '../services/form.service.js';
import { AppError } from '../utils/AppError.js';

describe('Form service - validateRegistrationForm', () => {
  let body: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  };
  
  beforeEach(() => {
    body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.test',
      password: 'K5f8v45R2s36E8f5!',
      confirmPassword: 'K5f8v45R2s36E8f5!',
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('should not throw an error for a valid registration form', () => {
    validateRegistrationForm(body);
    expect(() => validateRegistrationForm(body)).not.toThrow(AppError);
    expect(() => validateRegistrationForm(body)).not.toThrow(Error);
  });

  it('should throw an error if first name is missing', () => {
    body.firstName = '';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.');
  });
  
  it('should throw an error if last name is missing', () => {
    body.lastName = '';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.');
  });

  it('should throw an error if email is missing', () => {
    body.email = '';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.');
  });

  it('should throw an error if password is missing', () => {
    body.password = '';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.');
  });

  it('should throw an error if confirm password is missing', () => {
    body.confirmPassword = '';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.');
  });

  it('should throw an error if first name length is higher than 60 characters', () => {
    body.firstName = 'A'.repeat(61);
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Prénom" doit contenir au maximum 60 caractères.');
  });

  it('should throw an error if last name length is higher than 60 characters', () => {
    body.lastName = 'A'.repeat(61);
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Nom" doit contenir au maximum 60 caractères.');
  });

  it('should throw an error if first name contains an unauthorized character', () => {
    body.firstName = 'John$';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Prénom" contient des caractères non autorisés.');
  });

  it('should throw an error if last name contains an unauthorized character', () => {
    body.lastName = 'Doe£';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Nom" contient des caractères non autorisés.');
  });

  it("should throw an error if email doesn't respect email format", () => {
    body.email = 'john.doe.gmail.com';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le format email doit être respecté.');
  });

  it("should throw an error if email length is higher than 80 characters", () => {
    const firstEmailPart = 'A'.repeat(81);
    const secondEmailPart= '.doe@test.com';
    body.email = firstEmailPart + secondEmailPart;
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Email" doit contenir au maximum 80 caractères.');
  });

  it("should throw an error if password length is lower than 8 characters", () => {
    body.password = 'Gh4!';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" doit contenir au moins 8 caractères.');
  });

  it("should throw an error if password length is higher than 100 characters", () => {
    body.password += 'A'.repeat(101);
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" doit contenir au maximum 100 caractères.');
  });

  it('should throw an error if password contains an unauthorized character', () => {
    body.password += '{';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" contient des caractères non autorisés.');
  });

  it("should throw an error if confirm password length is lower than 8 characters", () => {
    body.confirmPassword = 'Gh4!';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Confirmation du mot de passe" doit contenir au moins 8 caractères.');
  });

  it("should throw an error if confirm password length is higher than 100 characters", () => {
    body.confirmPassword += 'A'.repeat(101);
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Confirmation du mot de passe" doit contenir au maximum 100 caractères.');
  });

  it('should throw an error if confirm password contains an unauthorized character', () => {
    body.confirmPassword += '{';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Confirmation du mot de passe" contient des caractères non autorisés.');
  });

  it("should throw an error if password and confirm password are differents", () => {
    body.password += 'g';
    body.confirmPassword += 't';
    let thrownError: AppError;
    try {
      validateRegistrationForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateRegistrationForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Mot de passe" et "Confirmation du mot de passe" doivent être identiques.');
  });
});

describe('Form service - validateLoginForm', () => {
  let body: {
    email: string,
    password: string,
  };
  
  beforeEach(() => {
    body = {
      email: 'john.doe@test.test',
      password: 'K5f8v45R2s36E8f5!',
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('should not throw an error for a valid registration form', () => {
    validateLoginForm(body);
    expect(() => validateLoginForm(body)).not.toThrow(AppError);
    expect(() => validateLoginForm(body)).not.toThrow(Error);
  });

  it('should throw an error if email is missing', () => {
    body.email = '';
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Email" et "Mot de passe" sont obligatoires.');
  });

  it('should throw an error if password is missing', () => {
    body.password = '';
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Les champs "Email" et "Mot de passe" sont obligatoires.');
  });

  it("should throw an error if email doesn't respect email format", () => {
    body.email = 'john.doe.gmail.com';
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le format email doit être respecté.');
  });

  it("should throw an error if email length is higher than 80 characters", () => {
    const firstEmailPart = 'A'.repeat(81);
    const secondEmailPart= '.doe@test.com';
    body.email = firstEmailPart + secondEmailPart;
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Email" doit contenir au maximum 80 caractères.');
  });

  it("should throw an error if password length is lower than 8 characters", () => {
    body.password = 'Gh4!';
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" doit contenir au moins 8 caractères.');
  });

  it("should throw an error if password length is higher than 100 characters", () => {
    body.password += 'A'.repeat(101);
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" doit contenir au maximum 100 caractères.');
  });

  it('should throw an error if password contains an unauthorized character', () => {
    body.password += '{';
    let thrownError: AppError;
    try {
      validateLoginForm(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }
    expect(() => validateLoginForm(body)).toThrow(AppError);
    expect(thrownError!.messageFront).toBe('Le champ "Mot de passe" contient des caractères non autorisés.');
  });
});