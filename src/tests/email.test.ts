import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { RegistrationBody } from "../types/Interfaces.js";
import emailjs from '@emailjs/nodejs';
import { sendEmail } from "../services/email.service.js";

describe('Email service - sendEmail', () => {
  let body: RegistrationBody;
  let token: string;
  let initEmailjsSpy: Mock;
  let sendEmailjsSpy: Mock;

  beforeEach(() => {
    body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'falsePassword-123-$%*',
      confirmPassword: 'falsePassword-123-$%*',
    };

    token = 'flase-json-web-token-regroigoritgnrgntr.trgonoritng.rgrtngrtoin';
    
    initEmailjsSpy = vi.spyOn(emailjs, 'init');
    sendEmailjsSpy = vi.spyOn(emailjs, 'send');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should init email js and send an email', async () => {
    initEmailjsSpy.mockReturnValue(undefined);
    sendEmailjsSpy.mockResolvedValue({status: 200, text: 'message'});

    await sendEmail(body, token);

    expect(initEmailjsSpy).toHaveBeenCalled();
    expect(sendEmailjsSpy).toHaveBeenCalled();
    const sendEmailjsSpyCallArgs = sendEmailjsSpy.mock.calls[0];
    expect(sendEmailjsSpyCallArgs![2]).toMatchObject({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });
    expect(sendEmailjsSpyCallArgs![2].link).toContain("/inscription/check-email/" + token);
  });

  it('should return an AppError if an unexpected error occurs', async () => {
    initEmailjsSpy.mockImplementation(() => {throw new Error();});
    sendEmailjsSpy.mockResolvedValue(undefined);

    await expect(sendEmail(body, token)).rejects.toMatchObject({
      status: 500,
      message: "sendEmail function in email service failed",
      messageFront: "Nous ne parvenons pas à envoyer le mail de confirmation, veuillez vous inscrire ultérieurement. Si ce problème persiste merci de contacter le support technique.", 
    });
  });
});