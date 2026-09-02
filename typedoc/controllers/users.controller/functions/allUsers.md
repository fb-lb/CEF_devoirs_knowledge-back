[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / allUsers

# Function: allUsers()

> **allUsers**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/controllers/users.controller.ts#L27)

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
