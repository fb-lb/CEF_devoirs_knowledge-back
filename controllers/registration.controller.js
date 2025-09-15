import { addUser } from '../services/user.service.js';
import { validateRegistrationForm } from '../services/form.service.js';


/**
 * User Registration
 * @async@function userRegistration
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 * 
 * A compléter
 * 
 */
export async function userRegistration(req, res) {
    const body = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'email': req.body.email,
        'password': req.body.password,
        'confirmPassword': req.body.confirmPassword
    };
    
    const validateUserInformations = validateRegistrationForm(body);

    if(!validateUserInformations.success) {
        return res.status(400).json({
            'success': false,
            'message': validateUserInformations.message
        });
    }
    const message = addUser(req.body.firstName, req.body.lastName);
    // return res.status(200).json({
    //     'success': true,
    //     'message': `Merci ${req.body.firstName} ${req.body.lastName}.\nVous êtes bien inscrit, un mail vous a été envoyé pour activer votre compte.`
    // })
    return res.status(200).json({
        'success': true,
        'message': message
    });
}