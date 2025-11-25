[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/theme.controller](../README.md) / addThemeController

# Function: addThemeController()

> **addThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/theme.controller.ts:96](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/theme.controller.ts#L96)

Handle theme creation.

## Parameters

### req

`Request`

Express request containing the theme informations in the body.

### res

`Response`

Express response containing the informations of all the themes.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the theme informations in data property.

## Route

POST /api/content/theme/add

## Description

Steps:
- Validates the theme informations,
- Gets the requestor ID,
- Creates the new theme,
- Get all theme informations,
