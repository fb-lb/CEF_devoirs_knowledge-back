[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-theme.controller](../README.md) / updateUserThemeController

# Function: updateUserThemeController()

> **updateUserThemeController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-theme.controller.ts:116](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-theme.controller.ts#L116)

Handle user-theme update.

## Parameters

### req

`Request`

Express request containing the user-theme informations in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

PATCH /api/user-theme/:userThemeId

## Description

Steps:
- Validates update user-theme informations,
- Checks that the user has access to all lessons in the theme, otherwise he can't certify his theme,
- Updates the user-theme isCertified property.
