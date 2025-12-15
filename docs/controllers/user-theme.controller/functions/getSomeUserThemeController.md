[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / getSomeUserThemeController

# Function: getSomeUserThemeController()

> **getSomeUserThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:74](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/user-theme.controller.ts#L74)

Handle all user-themes retrieval for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-theme informations for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-theme informations for a specific user in data property.

## Route

GET /api/user-theme/some

## Description

Steps:
- Gets the ID of the requestor who is the user related to user-themes to retrieve,
- Retrieves all user-theme informations for a specific user.
