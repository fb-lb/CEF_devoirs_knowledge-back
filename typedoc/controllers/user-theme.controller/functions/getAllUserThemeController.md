[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / getAllUserThemeController

# Function: getAllUserThemeController()

> **getAllUserThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-theme.controller.ts#L29)

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
