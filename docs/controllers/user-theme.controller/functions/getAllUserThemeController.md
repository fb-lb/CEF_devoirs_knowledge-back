[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / getAllUserThemeController

# Function: getAllUserThemeController()

> **getAllUserThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/user-theme.controller.ts#L22)

Handle all user-themes retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-theme informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-theme informations in data property.

## Route

GET /api/user-theme/all

## Description

Steps:
- Retrieves all user-theme informations.
