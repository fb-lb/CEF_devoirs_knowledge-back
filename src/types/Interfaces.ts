import { JwtPayload } from "jsonwebtoken";

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

export interface ApiResponse<T = undefined> {
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

export interface MyCheckingPayload extends JwtPayload {
  user: {
    id: number;
    firstName: string;        
    lastName: string;
    email: string;
    roles: ('user' | 'admin')[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    updatedBy: number | null;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface UpdateUserBody {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: ('user' | 'admin')[];
  isVerified: boolean;
}