[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / getAllThemesAvailableController

# Function: getAllThemesAvailableController()

> **getAllThemesAvailableController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/user-theme.controller.ts#L47)

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
