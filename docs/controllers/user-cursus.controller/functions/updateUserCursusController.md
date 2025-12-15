[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / updateUserCursusController

# Function: updateUserCursusController()

> **updateUserCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:141](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/user-cursus.controller.ts#L141)

Handle user-cursus update.

## Parameters

### req

`Request`

Express request containing the user-cursus informations in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

PATCH /api/user-cursus/:userCursusId

## Description

Steps:
- Validate update user-cursus informations,
- Checks that the user has access to all lessons in the cursus, otherwise he can't validate his cursus,
- Updates the user-cursus isVerified property.
