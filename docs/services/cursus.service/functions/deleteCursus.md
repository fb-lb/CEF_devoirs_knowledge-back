[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / deleteCursus

# Function: deleteCursus()

> **deleteCursus**(`cursusId`): `Promise`\<`void`\>

Defined in: [src/services/cursus.service.ts:217](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/cursus.service.ts#L217)

**`Function`**

Deletes a cursus in the database with its ID, image files of lessons in this cursus and decreases by one order of the other cursus in the same theme.

## Parameters

### cursusId

`number`

ID used to retrieve the cursus to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteCursus

## Throws

If the cursus to delete is not found with the provided ID.

## Throws

If an unexpected error occurs during the cursus deletion.
