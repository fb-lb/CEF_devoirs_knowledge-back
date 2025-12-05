import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { Request, Response } from 'express';
import * as formService from '../services/form.service.js';
import * as userService from '../services/user.service.js';
import * as tokenService from '../services/token.service.js';
import * as emailService from '../services/email.service.js';
import { MyCheckingPayload } from '../types/Interfaces.js';
import { userRegistration } from '../controllers/registration.controller.js';
import { MockResponse } from '../types/types.js';

function createMockResponse(): MockResponse {
  const res = {} as MockResponse;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('Registration controller - userRegistration', () => {
  let req: Partial<Request>;
  let res: MockResponse;
  let validateRegistrationFormSpy: Mock;
  let addUserSpy: Mock;
  let generateTokenSpy: Mock;
  let sendEmailSpy: Mock;
  let newUser: MyCheckingPayload["user"];
  let token: string;
  
  beforeEach(() => {
    req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.test',
        password: 'K5f8v45R2s36E8f5',
        confirmPassword: 'K5f8v45R2s36E8f5',
      }
    };

    validateRegistrationFormSpy = vi.spyOn(formService,"validateRegistrationForm");
    addUserSpy = vi.spyOn(userService, "addUser");
    generateTokenSpy = vi.spyOn(tokenService, "generateToken");
    sendEmailSpy = vi.spyOn(emailService, "sendEmail");
    res = createMockResponse();

    newUser = {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.test',
      roles: ['user'],
      isVerified: false,
      createdAt:"27/11/2025 15:10:32",
      updatedAt: "27/11/2025 15:10:32",
      updatedBy: null,
    };
    token = "eyJhkud52zciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIkl7ImlkIjoxLCJlbWFpbCI6ImpvaG5mioZG9lQHRlc3QuY29tIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwicm9sZXMiOlsidXNlciIsImFkbWluIl0sImlzVmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIxLzEwLzIwMjUgMTI6MzI6MTUiLCJ1cGRhdGVkQXQiOiIzMS8xMC8yMDI1IDE2OjA4OjQxIiwidXBkYXRlZEJ5IjoxfSwiaWF0IjoxNzY0MjU0NjYwLCJleHAiOjE3NjQzNDEwNjB9.4i6RfFup4JUuFFJN2u38qXi7RFJrG6RnHGxVWHu5my4";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 200, with a token in the response and the created user', async () => {
    validateRegistrationFormSpy.mockReturnValue(true);
    addUserSpy.mockResolvedValue(newUser);
    generateTokenSpy.mockReturnValue(token);
    sendEmailSpy.mockResolvedValue(true);

    await userRegistration(req as Request, res as unknown as Response);

    expect(validateRegistrationFormSpy).toHaveBeenCalledWith(req.body);
    expect(addUserSpy).toHaveBeenCalledWith(req.body);
    expect(generateTokenSpy).toHaveBeenCalledWith(newUser);
    expect(sendEmailSpy).toHaveBeenCalledWith(req.body, token);
    expect(res.status).toHaveBeenCalledWith(200);
    const jsonArg = res.json.mock.calls[0]![0];
    expect(jsonArg.success).toBe(true);
    expect(jsonArg.message).toContain('John');
    expect(jsonArg.message).toContain('Doe');
    expect(jsonArg.data).toEqual(newUser);
  });
});