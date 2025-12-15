[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / addUser

# Function: addUser()

> **addUser**(`body`): `Promise`\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Defined in: [src/services/user.service.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/user.service.ts#L44)

**`Function`**

Creates a user in the database.

## Parameters

### body

[`RegistrationBody`](../../../types/Interfaces/interfaces/RegistrationBody.md)

Object containing user informations :
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

## Returns

`Promise`\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Returns an object containing the user informations.
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: ("user" | "admin")[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: number | null;
}

## Async

addUser

## Throws

If the email address is already used by a registered user.

## Throws

If an unexpected error occurs during the creation.
