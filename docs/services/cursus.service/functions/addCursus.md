[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / addCursus

# Function: addCursus()

> **addCursus**(`cursusName`, `price`, `cursusInSameTheme`, `requestorId`, `themeId`): `Promise`\<`void`\>

Defined in: [src/services/cursus.service.ts:176](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/cursus.service.ts#L176)

**`Function`**

Creates a new cursus after verifying that the name is unique between cursus in the same theme.

## Parameters

### cursusName

`string`

The name of the cursus to add.

### price

`number`

Price of the new cursus.

### cursusInSameTheme

[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]

The list of existing cursus (in the same theme) used to ensure name uniqueness.

### requestorId

`number`

The ID of the user who creates the cursus.

### themeId

`number`

The ID of the theme containing the new cursus.

## Returns

`Promise`\<`void`\>

## Async

addCursus

## Throws

If a curus with the same name already exists.

## Throws

If an unexpected error occurs during cursus creation.
