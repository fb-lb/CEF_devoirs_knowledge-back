[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getAllElementsController

# Function: getAllElementsController()

> **getAllElementsController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/element.controller.ts#L26)

Handle all elements retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all cursus informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing all element informations in data property.

## Route

GET /api/content/element/all

## Description

Steps:
- Retrieves all elements informations.
