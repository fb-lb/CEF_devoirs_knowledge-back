[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / deleteUserCursusForThisCursus

# Function: deleteUserCursusForThisCursus()

> **deleteUserCursusForThisCursus**(`cursusId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-cursus.service.ts:447](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-cursus.service.ts#L447)

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
