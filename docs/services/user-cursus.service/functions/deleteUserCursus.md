[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / deleteUserCursus

# Function: deleteUserCursus()

> **deleteUserCursus**(`userCursusId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-cursus.service.ts:361](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/user-cursus.service.ts#L361)

**`Function`**

Deletes a user-cursus and related user-lessons. Check if user-theme related to the user-cursus has still user-cursus under it.
If not it deletes the user-theme, otherwise it checks its isCertified property.

## Parameters

### userCursusId

`number`

The ID of the user-cursus association to delete.

### requestorId

`number`

The ID of the user performing the deletion.

## Returns

`Promise`\<`void`\>

## Async

deleteUserCursus

## Throws

If user-cursus association is not found with the user-cursus ID provided.

## Throws

If user-theme association related to the user-cursus association is not found.

## Throws

If an unexpected error occurs during the deletion.
