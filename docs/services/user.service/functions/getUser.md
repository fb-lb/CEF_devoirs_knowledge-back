[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / getUser

# Function: getUser()

> **getUser**(`userId`): `Promise`\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Defined in: [src/services/user.service.ts:107](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/user.service.ts#L107)

**`Function`**

Get a user informations in the database.

## Parameters

### userId

`number`

Id of the user to retrieve.

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

getUser

## Throws

If the user is not found in the database with the provided id.

## Throws

If an unexpected error occurs during the retrieval.
