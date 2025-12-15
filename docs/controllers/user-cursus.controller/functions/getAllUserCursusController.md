[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / getAllUserCursusController

# Function: getAllUserCursusController()

> **getAllUserCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:63](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/user-cursus.controller.ts#L63)

Handle all user-cursus retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-cursus informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-cursus informations in data property.

## Route

GET /api/user-cursus/all

## Description

Steps:
- Retrieves all user-cursus informations.
