[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / deleteCursus

# Function: deleteCursus()

> **deleteCursus**(`cursusId`): `Promise`\<`void`\>

Defined in: [src/services/cursus.service.ts:258](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/cursus.service.ts#L258)

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
