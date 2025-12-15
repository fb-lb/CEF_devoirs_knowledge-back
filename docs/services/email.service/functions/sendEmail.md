[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/email.service](../README.md) / sendEmail

# Function: sendEmail()

> **sendEmail**(`body`, `token`): `Promise`\<`void`\>

Defined in: [src/services/email.service.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/email.service.ts#L24)

**`Function`**

Send an email to a user to verify his email address and his account.

## Parameters

### body

[`RegistrationBody`](../../../types/Interfaces/interfaces/RegistrationBody.md)

Object containing the user informations {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

### token

`string`

The token which will be added to a link to verify the email address.

## Returns

`Promise`\<`void`\>

## Async

sendEmail

## Throws

If an unexpected error occurs during email sending.
