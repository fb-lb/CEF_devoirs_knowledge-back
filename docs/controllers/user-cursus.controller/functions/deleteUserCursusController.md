[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / deleteUserCursusController

# Function: deleteUserCursusController()

> **deleteUserCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:189](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/user-cursus.controller.ts#L189)

Handle user-cursus deletion.

## Parameters

### req

`Request`

Express request containing the ID of the user-cursus to delete in URL parameter.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

DELETE /api/user-cursus/:userCursusId

## Description

Steps:
- Deletes the targeted user-cursus.

## Throws

If user-cursus relation is not found with the provided ID.
