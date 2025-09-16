import { RegistrationBody, RegistrationResponse } from "../types/Resgistration.js";

// If you modify one of these tests, make sure that front end validators are also modified
export function validateRegistrationForm(body: RegistrationBody): RegistrationResponse {
    const response: RegistrationResponse = {
        'success': false,
        'message': ''
    }

    // Test required validator
    if(!body.firstName || !body.lastName || !body.email || !body.password || !body.confirmPassword) {
        response.message = 'Les champs "Nom", "Prénom", "Email", "Mot de passe" et "Confirmation du mot de passe" sont obligatoires.';
        return response;
    }

    // Test firstName length
    if (body.firstName.length > 60) {
        response.message = 'Le champ "Prénom" doit contenir au maximum 60 caractères.';
        return response;
    }

    // Test lastName length
    if (body.lastName.length > 60) {
        response.message = 'Le champ "Nom" doit contenir au maximum 60 caractères.';
        return response;
    }

    // Test firstName special caracters
    const regex = /^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/;
    if (!regex.test(body.firstName)) {
        response.message = 'Le champ "Prénom" contient des caractères non autorisés.';
        return response;
    }

    // Test lastName special caracters
    if (!regex.test(body.lastName)) {
        response.message = 'Le champ "Nom" contient des caractères non autorisés.';
        return response;
    }

    // Test email format
    const email =  body.email;
    if (!email.includes('@') || 
        !(email.indexOf('@') > 0) ||
        !email.includes('.') ||
        !(email.lastIndexOf('.') > email.indexOf('@') + 1) ||
        !(email.lastIndexOf('.') < email.length - 1)) {
        response.message = 'Le format email doit être respecté.';
        return response;
    }

    // Test email length
    if (body.email.length > 80) {
        response.message = 'Le champ "Email" doit contenir au maximum 80 caractères.';
        return response;
    }

    // Test password length
    if (body.password.length < 8) {
        response.message = 'Le champ "Mot de passe" doit contenir au moins 8 caractères.';
        return response;
    }

    if (body.password.length > 100) {
        response.message = 'Le champ "Mot de passe" doit contenir au maximum 100 caractères.';
        return response;
    }

    // Test confirmPassword length
    if (body.confirmPassword.length < 8) {
        response.message = 'Le champ "Confirmation du mot de passe" doit contenir au moins 8 caractères.';
        return response;
    }

    if (body.confirmPassword.length > 100) {
        response.message = 'Le champ "Confirmation du mot de passe" doit contenir au maximum 100 caractères.';
        return response;
    }

    // Test equality between password and confirm password
    if (body.password !== body.confirmPassword) {
        response.message = 'Les champs "Mot de passe" et "Confirmation du mot de passe" doivent être identiques.';
        return response;
    }

    response.success = true;
    return response;
}