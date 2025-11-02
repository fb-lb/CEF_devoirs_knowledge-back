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

export interface ThemeData {
  id: number;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface CursusData {
  id: number;
  themeId: number;
  name: string;
  price: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface LessonData {
  id: number;
  cursusId: number;
  name: string;
  price: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface BaseElement {
  id: number;
  lessonId: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export type ElementData =
  | (BaseElement & {
    type: 'text';
    textType: 'title1' | 'title2' | 'title3' | 'paragraph';
    content: string;
  })
  | (BaseElement & {
    type: 'image';
    legend: string | null;
    source: string;
    alternative: string;
  });

export interface UserCursusData {
  id: number;
  userId: number;
  cursusId: number;
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface UserLessonData {
  id: number;
  userId: number;
  lessonId: number;
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}