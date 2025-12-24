[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / deleteUserThemeController

# Function: deleteUserThemeController()

> **deleteUserThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:182](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-theme.controller.ts#L182)

Handle user-theme deletion.

## Parameters

### req

`Request`

Express request containing the ID of the user-theme to delete in URL parameter.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

DELETE /api/user-theme/:userThemeId

## Description

Steps:
- Deletes the targeted user-theme.

## Throws

If user-theme relation is not found with the provided ID.
