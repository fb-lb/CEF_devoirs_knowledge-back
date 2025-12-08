import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import * as userService from "../services/user.service.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";

describe('User service - addUser', () => {
  let body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  let fakeHashedPassword: string;
  let hashBcryptSpy: Mock;
  let createUserSpy: Mock;
  let newUser: User;
  
  beforeEach(async () => {
    body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.test',
      password: 'K5f8v45R2s36E8f5',
      confirmPassword: 'K5f8v45R2s36E8f5',
    };

    hashBcryptSpy = vi.spyOn(bcrypt, 'hash');
    createUserSpy = vi.spyOn(User, 'create');

    fakeHashedPassword = 'fake-hashed-password-12345-*ù^$';

    newUser = new User({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.test',
      password: fakeHashedPassword,
      roles: ['user'],
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return a promise object containing the new user data', async () => {
    hashBcryptSpy.mockResolvedValue(fakeHashedPassword);
    createUserSpy.mockResolvedValue(newUser);

    const cleanUser = await userService.addUser(body);
    
    expect(hashBcryptSpy).toHaveBeenCalledWith(body.password, 10);
    expect(createUserSpy).toHaveBeenCalledTimes(1);

    const callArg = createUserSpy.mock.calls[0]![0];

    expect(createUserSpy).toHaveBeenCalledWith(expect.objectContaining({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: fakeHashedPassword,
    }));

    expect(typeof callArg.password).toBe('string');
    expect(callArg.password).not.toBe(body.password);
    expect(callArg.password.length).toBeGreaterThan(20);

    expect(callArg.confirmPassword).toBeUndefined();

    expect(cleanUser).toMatchObject({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.test',
      roles: ['user'],
      isVerified: false,
      createdAt: newUser.createdAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedAt: newUser.updatedAt.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedBy: null,
    });

    expect(Object.keys(cleanUser)).toEqual([
      "id",
      "email",
      "firstName",
      "lastName",
      "roles",
      "isVerified", 
      "createdAt",
      "updatedAt", 
      "updatedBy"
    ]);
  });

  it('should throw an AppError if a registered user has the same email address', async () => {
    hashBcryptSpy.mockResolvedValue(fakeHashedPassword);
    const error = new Error();
    error.name = 'SequelizeUniqueConstraintError';
    createUserSpy.mockRejectedValue(error);

    let thrownError: AppError;

    try {
      await userService.addUser(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }

    expect(hashBcryptSpy).toHaveBeenCalledWith(body.password, 10);
    expect(createUserSpy).toHaveBeenCalledWith(expect.objectContaining({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: fakeHashedPassword,
    }));
    expect(thrownError!.status).toBe(409);
    expect(thrownError!.message).toBe("Email already used by another account");
  });

  it('should throw an AppError if an unexpected error occurs', async () => {
    hashBcryptSpy.mockResolvedValue(fakeHashedPassword);
    createUserSpy.mockRejectedValue(new Error());
    let thrownError: AppError;

    try {
      await userService.addUser(body);
    } catch (error) {
      if (error instanceof AppError) thrownError = error;
    }

    expect(hashBcryptSpy).toHaveBeenCalledWith(body.password, 10);
    expect(createUserSpy).toHaveBeenCalledWith(expect.objectContaining({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: fakeHashedPassword,
    }));
    expect(thrownError!.status).toBe(500);
    expect(thrownError!.message).toBe("addUser function user service failed");
  });
});