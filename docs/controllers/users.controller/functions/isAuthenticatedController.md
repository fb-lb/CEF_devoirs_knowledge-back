[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / isAuthenticatedController

# Function: isAuthenticatedController()

> **isAuthenticatedController**(`req`, `res`, `next`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:99](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/users.controller.ts#L99)

Handle user authenticate verification.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response.

### next

`NextFunction`

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

GET /api/utilisateurs/isAuthenticated

## Description

Steps:
- Verifies that the requestor is connected as a user.

## Throws

If an unexpected error occurs.
