[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / deleteUser

# Function: deleteUser()

> **deleteUser**(`userId`): `Promise`\<`void`\>

Defined in: [src/services/user.service.ts:294](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/user.service.ts#L294)

**`Function`**

Deletes a user.

## Parameters

### userId

`number`

The ID of the user to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteUser

## Throws

If the user to delete is not found in the database with the provided ID.

## Throws

If an unexpected error occurs during the deletion.
