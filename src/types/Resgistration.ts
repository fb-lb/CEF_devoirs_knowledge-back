export interface RegistrationBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
}