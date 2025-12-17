[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / getCursusController

# Function: getCursusController()

> **getCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:48](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/cursus.controller.ts#L48)

Handle one cursus retrieval.

## Parameters

### req

`Request`

Express request containing the ID of the cursus to retrieve in URL parameter.

### res

`Response`

Express response containing the informations of the cursus.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing the cursus informations in data property.

## Route

GET /api/content/cursus/:id

## Description

Steps:
- Retrieves the cursus informations with the provided ID.
