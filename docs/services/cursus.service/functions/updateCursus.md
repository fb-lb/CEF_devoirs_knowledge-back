[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / updateCursus

# Function: updateCursus()

> **updateCursus**(`cursusId`, `newCursusName`, `newCursusPrice`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/cursus.service.ts:267](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/cursus.service.ts#L267)

**`Function`**

Update a cursus retrieved by its ID.

## Parameters

### cursusId

`number`

The ID of the cursus to update.

### newCursusName

`string`

The new name of the cursus to update.

### newCursusPrice

`number`

The new price of the cursus to update.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`void`\>

## Async

updateCursus

## Throws

If the cursus to update is not found with the provided ID.

## Throws

If an unexpected error occurs during the update.
