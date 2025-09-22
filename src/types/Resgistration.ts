export interface RegistrationBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrationResponse<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
}

export interface AddUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}