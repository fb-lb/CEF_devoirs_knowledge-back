[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / getAllCursusController

# Function: getAllCursusController()

> **getAllCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/cursus.controller.ts#L25)

Handle all cursus retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all cursus informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing cursus informations in data property.

## Route

GET /api/content/cursus/all

## Description

Steps:
- Retrieves all cursus informations.
