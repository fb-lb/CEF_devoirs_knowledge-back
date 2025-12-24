[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / allUsers

# Function: allUsers()

> **allUsers**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/users.controller.ts#L27)

Handle all users retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user informations in data property.

## Route

GET /api/utilisateurs/tous

## Description

Steps:
- Retrieves all user informations.
