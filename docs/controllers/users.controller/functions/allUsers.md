[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / allUsers

# Function: allUsers()

> **allUsers**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`object`[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/users.controller.ts#L22)

Handle all users retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`object`[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user informations in data property.

## Route

GET /api/utilisateurs/tous

## Description

Steps:
- Retrieves all user informations.
