[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / updateUserCursus

# Function: updateUserCursus()

> **updateUserCursus**(`userCursusId`, `isValidated`, `requestorId`): `Promise`\<`boolean`\>

Defined in: [src/services/user-cursus.service.ts:300](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user-cursus.service.ts#L300)

**`Function`**

Updates a user-cursus informations.

## Parameters

### userCursusId

`number`

The user-cursus ID used to retrieve the user-cursus association.

### isValidated

`boolean`

The new value of the user-cursus validation property.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`boolean`\>

Returns `true` user-cursus validation property is updated.
Returns `false` if user-cursus validation property is already equals to isValidated parameter.

## Async

updateUserCursus

## Throws

If the user-cursus association to update is not found whith the user-cursus assocation ID provided.

## Throws

If an unexpected error occurs during the update.
