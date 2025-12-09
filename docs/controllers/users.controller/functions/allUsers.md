[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / allUsers

# Function: allUsers()

> **allUsers**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`object`[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/users.controller.ts#L22)

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
