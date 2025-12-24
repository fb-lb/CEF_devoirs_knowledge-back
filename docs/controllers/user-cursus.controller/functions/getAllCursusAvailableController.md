[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / getAllCursusAvailableController

# Function: getAllCursusAvailableController()

> **getAllCursusAvailableController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:136](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-cursus.controller.ts#L136)

Handle retrieval of all available cursus for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all cursus available for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing informations on available cursus for a specific user in data property.

## Route

GET /api/user-cursus/cursus/all

## Description

Steps:
- Gets the ID of the requestor who is the user related to the cursus to retrieve,
- Retrieves informations on all available cursus for a specific user.
