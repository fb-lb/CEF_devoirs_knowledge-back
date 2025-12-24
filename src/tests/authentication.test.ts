import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Request, Response } from "express";
import { login } from "../controllers/authentication.controller.js";
import { LoginBody, UserData } from "../types/Interfaces.js";
import { MockResponse } from "../types/types.js";
import * as formService from '../services/form.service.js';
import * as authenticationService from '../services/authentication.service.js';
import * as tokenService from "../services/token.service.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';

function createMockResponse(): MockResponse {
  const res = {} as MockResponse ;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.setHeader = vi.fn().mockReturnValue(res);
  return res;
}

describe('Authentication controller - login', () => {
  let req: Partial<Request<{}, {}, LoginBody>>;
  let res: MockResponse;
  let validateLoginFormSpy: Mock;
  let testLoginRequestSpy: Mock;
  let generateUserTokenSpy: Mock;
  let user: UserData;
  let token: string;
  
  beforeEach(() => {
    req = {
      body: {
        email: 'john.doe@test.com',
        password: 'fake-password-123456-%$*',
      }
    };

    res = createMockResponse();

    validateLoginFormSpy = vi.spyOn(formService, 'validateLoginForm');
    testLoginRequestSpy = vi.spyOn(authenticationService, 'testLoginRequest');
    generateUserTokenSpy = vi.spyOn(tokenService, 'generateUserToken');

    user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      roles: ['user'],
      isVerified: true,
      createdAt: new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedAt: new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}),
      updatedBy: null,
    };
    token = 'false-token-eyfgregrggfbb.tnttrhrthn.erthtrhytzh';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return response object with 200 status code', async () => {
    validateLoginFormSpy.mockReturnValue(undefined);
    testLoginRequestSpy.mockResolvedValue(user);
    generateUserTokenSpy.mockReturnValue(token);

    await login(req as Request<{}, {}, LoginBody>, res as unknown as Response);
  
    expect(validateLoginFormSpy).toHaveBeenCalledWith(req.body);
    expect(testLoginRequestSpy).toHaveBeenCalledWith(req.body?.email, req.body?.password);
    expect(generateUserTokenSpy).toHaveBeenCalledWith(user);
    expect(res.setHeader).toHaveBeenCalledWith('Authorization', `Bearer ${token}`);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({success: true, message: ""});
  });

  it('should return a response with 401 status because testLoginRequest did not found a user', async () => {
    validateLoginFormSpy.mockReturnValue(undefined);
    testLoginRequestSpy.mockResolvedValue('Cet email ne correspond à aucun compte enregistré.');
    generateUserTokenSpy.mockReturnValue(undefined);

    await login(req as Request<{}, {}, LoginBody>, res as unknown as Response);
  
    expect(validateLoginFormSpy).toHaveBeenCalledWith(req.body);
    expect(testLoginRequestSpy).toHaveBeenCalledWith(req.body?.email, req.body?.password);
    expect(generateUserTokenSpy).toHaveBeenCalledTimes(0);
    expect(res.setHeader).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({success: false, message: 'Cet email ne correspond à aucun compte enregistré.'});
  });
});

describe('Authentication service - testLoginRequest', () => {
  let email: string;
  let password: string;
  let findOneUserSpy: Mock;
  let compareBcrypt: Mock;
  let user: Partial<User>;

  beforeEach(() => {
    email = "john.doe@test.com";
    password = 'fake-password-12345-*ù$!';
    findOneUserSpy = vi.spyOn(User, 'findOne');
    compareBcrypt = vi.spyOn(bcrypt, 'compare');
    user = {
      id: 1,
      email: "john.doe@test.com",
      firstName: "John",
      lastName: "Doe",
      password: 'fake-password-12345-*ù$!',
      roles: ['user'],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: null,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return user's data - test login request is a success", async () => {
    findOneUserSpy.mockResolvedValue(user);
    compareBcrypt.mockResolvedValue(true);

    await authenticationService.testLoginRequest(email, password);

    expect(findOneUserSpy).toHaveBeenCalledWith({ where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']
    });
    expect(compareBcrypt).toHaveBeenCalledWith(password, user.password);
  });

  it('should return a string because user was not found in the database', async () => {
    findOneUserSpy.mockResolvedValue(null);
    compareBcrypt.mockResolvedValue(undefined);

    const response = await authenticationService.testLoginRequest(email, password);

    expect(findOneUserSpy).toHaveBeenCalledWith({ where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']
    });
    expect(compareBcrypt).toHaveBeenCalledTimes(0);
    expect(response).toBeTypeOf('string');
  });

  it('should return a string because email and password association is wrong', async () => {
    findOneUserSpy.mockResolvedValue(user);
    compareBcrypt.mockResolvedValue(false);

    const response = await authenticationService.testLoginRequest(email, password);

    expect(findOneUserSpy).toHaveBeenCalledWith({ where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']
    });
    expect(compareBcrypt).toHaveBeenCalledWith(password, user.password);
    expect(response).toBeTypeOf('string');
  });

  it('should throw an AppError because an unexpected error occurs', async () => {
    findOneUserSpy.mockRejectedValue(new Error());
    compareBcrypt.mockResolvedValue(undefined);

    await expect(authenticationService.testLoginRequest(email, password)).rejects.toMatchObject({
      status: 500,
      message: "internal server error",
      messageFront: "Une erreur interne est survenue, si vous ne parvenez pas à vous connecter, merci de contacter le support.",
    });

    expect(findOneUserSpy).toHaveBeenCalledWith({ where: { email: email }, 
      attributes: ['id', 'email', 'firstName', 'lastName', 'password', 'roles', 'isVerified', 'createdAt', 'updatedAt', 'updatedBy']
    });
    expect(compareBcrypt).toHaveBeenCalledTimes(0);
  });
});