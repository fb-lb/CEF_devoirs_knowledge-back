[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/theme.service](../README.md) / getTheme

# Function: getTheme()

> **getTheme**(`themeId`): `Promise`\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)\>

Defined in: [src/services/theme.service.ts:58](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/theme.service.ts#L58)

**`Function`**

Retrieves a theme in the database with its ID.

## Parameters

### themeId

`number`

The ID used to retrieve the theme.

## Returns

`Promise`\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)\>

An object containing the theme informations.

## Async

getTheme

## Throws

If the theme is not found with provided ID

## Throws

If an error occurs during theme retrieval
