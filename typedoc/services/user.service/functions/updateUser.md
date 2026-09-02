[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / updateUser

# Function: updateUser()

> **updateUser**(`requestorId`, `userData`, `userId`): `Promise`\<`void`\>

Defined in: [src/services/user.service.ts:241](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/user.service.ts#L241)

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

### userId

`number`

## Returns

`Promise`\<`void`\>

## Async

updateUser

## Throws

If an unexpected error occurs during the update.
