[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / updateUser

# Function: updateUser()

> **updateUser**(`requestorId`, `userData`): `Promise`\<`void`\>

Defined in: [src/services/user.service.ts:186](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user.service.ts#L186)

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
