[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / deleteUserCursusForThisCursus

# Function: deleteUserCursusForThisCursus()

> **deleteUserCursusForThisCursus**(`cursusId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-cursus.service.ts:447](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/user-cursus.service.ts#L447)

**`Function`**

Deletes all user-cursus associations related to a cursus.

## Parameters

### cursusId

`number`

The ID of the cursus related to all user-cursus associations to delete.

### requestorId

`number`

The ID of the user performing the deletion.

## Returns

`Promise`\<`void`\>

## Async

deleteUserCursusForThisCursus

## Throws

If an expected error occurs during the user-cursus deletions.
