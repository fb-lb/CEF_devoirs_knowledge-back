[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/theme.controller](../README.md) / deleteThemeController

# Function: deleteThemeController()

> **deleteThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/theme.controller.ts:157](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/theme.controller.ts#L157)

Handle theme deletion.

## Parameters

### req

`Request`

Express request containing the ID of the theme to delete in URL parameter.

### res

`Response`

Express response containing the informations of all the themes.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the theme informations in data property.

## Route

DELETE /api/content/theme/:id

## Description

Steps:
- Deletes all the user-themes related to the theme to delete,
- Deletes the target theme,
- Get all theme informations.

## Throws

If theme ID URL parameter is not provided.
