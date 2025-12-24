[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / updateUser

# Function: updateUser()

> **updateUser**(`requestorId`, `userData`): `Promise`\<`void`\>

Defined in: [src/services/user.service.ts:239](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user.service.ts#L239)

**`Function`**

Update informations of a user.

## Parameters

### requestorId

`number`

The ID of the user performing the update.

### userData

[`UpdateUserBody`](../../../types/Interfaces/interfaces/UpdateUserBody.md)

Object containing the new informations :
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: ("user" | "admin")[];
  isVerified: boolean;
}

## Returns

`Promise`\<`void`\>

## Async

updateUser

## Throws

If an unexpected error occurs during the update.
