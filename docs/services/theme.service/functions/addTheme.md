[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/theme.service](../README.md) / addTheme

# Function: addTheme()

> **addTheme**(`themeName`, `allThemes`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/theme.service.ts:170](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/theme.service.ts#L170)

**`Function`**

Creates a new theme after verifying that the name is unique.

## Parameters

### themeName

`string`

The name of the theme to add.

### allThemes

[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]

The list of existing themes used to ensure name uniqueness.

### requestorId

`number`

The ID of the user who creates the theme.

## Returns

`Promise`\<`void`\>

## Async

addTheme

## Throws

If a theme with the same name already exists.

## Throws

If an unexpected error occurs during theme creation.
