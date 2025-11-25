[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / deleteUserCursusForThisCursus

# Function: deleteUserCursusForThisCursus()

> **deleteUserCursusForThisCursus**(`cursusId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-cursus.service.ts:447](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user-cursus.service.ts#L447)

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
