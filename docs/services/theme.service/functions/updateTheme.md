[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/theme.service](../README.md) / updateTheme

# Function: updateTheme()

> **updateTheme**(`themeId`, `newThemeName`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/theme.service.ts:254](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/theme.service.ts#L254)

**`Function`**

Update a theme name retrieved by its ID.

## Parameters

### themeId

`number`

The ID of the theme to update.

### newThemeName

`string`

The new name of the theme to update.

### requestorId

`number`

The Id of the user performing the update.

## Returns

`Promise`\<`void`\>

## Async

updateTheme

## Throws

If the theme to update is not found with the provided ID.

## Throws

If an unexpected error occurs during the update.
