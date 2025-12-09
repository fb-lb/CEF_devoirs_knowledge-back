[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/theme.controller](../README.md) / updateThemeController

# Function: updateThemeController()

> **updateThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/theme.controller.ts:172](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/theme.controller.ts#L172)

Handle theme update.

## Parameters

### req

`Request`

Express request containing the ID of the theme to update in URL parameter.

### res

`Response`

Express response containing the informations of all the themes.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the theme informations in data property.

## Route

PATCH /api/content/theme/:id

## Description

Steps:
- Validates the theme informations,
- Updates the target theme,
- Get all theme informations.

## Throws

If theme ID URL parameter is not provided.
