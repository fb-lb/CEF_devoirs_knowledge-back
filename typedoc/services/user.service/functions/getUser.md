[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / getUser

# Function: getUser()

> **getUser**(`userId`): `Promise`\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>

Defined in: [src/services/user.service.ts:109](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/user.service.ts#L109)

**`Function`**

Get a user informations in the database.

## Parameters

### userId

`number`

Id of the user to retrieve.

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

getUser

## Throws

If the user is not found in the database with the provided id.

## Throws

If an unexpected error occurs during the retrieval.
