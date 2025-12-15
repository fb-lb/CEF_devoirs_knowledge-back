[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / isAuthenticatedController

# Function: isAuthenticatedController()

> **isAuthenticatedController**(`req`, `res`, `next`): `Promise`\<`void` \| `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:98](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/users.controller.ts#L98)

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

`Promise`\<`void` \| `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code. For success property :
- returns true if requestor is connected to his account.
- returns false if requestor is not connect to an account.

## Route

GET /api/utilisateurs/isAuthenticated

## Description

Steps:
- Verifies that the requestor is connected as a user.
