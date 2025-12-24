[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / getAllThemesAvailableController

# Function: getAllThemesAvailableController()

> **getAllThemesAvailableController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:57](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-theme.controller.ts#L57)

Handle retrieval of all available themes for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all available themes for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing informations on available themes for a specific user in data property.

## Route

GET /api/user-theme/theme/all

## Description

Steps:
- Gets the ID of the requestor who is the user related to the themes to retrieve,
- Retrieves informations on all available themes for a specific user.
