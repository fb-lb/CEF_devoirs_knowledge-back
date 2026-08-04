[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / addUser

# Function: addUser()

> **addUser**(`body`): `Promise`\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>

Defined in: [src/services/user.service.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user.service.ts#L44)

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

`Promise`\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>

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
