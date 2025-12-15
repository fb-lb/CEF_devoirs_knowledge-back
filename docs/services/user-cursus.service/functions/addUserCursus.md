[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / addUserCursus

# Function: addUserCursus()

> **addUserCursus**(`userId`, `cursusId`, `requestorId`): `Promise`\<`number` \| `null`\>

Defined in: [src/services/user-cursus.service.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/user-cursus.service.ts#L27)

**`Function`**

Adds a user-cursus association into the database.

## Parameters

### userId

`number`

The ID of the user related to the cursus.

### cursusId

`number`

The ID of the cursus related to the user.

### requestorId

`number`

The ID of the user performing the creation.

## Returns

`Promise`\<`number` \| `null`\>

Returns the ID of the theme containing the cursus if user-cursus creation is a success.
Returns null if this user-cursus association already exists in the database.

## Async

addUserCursus

## Throws

If an unexpected error occurs during user-cursus creation.
