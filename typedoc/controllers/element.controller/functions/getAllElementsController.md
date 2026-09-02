[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getAllElementsController

# Function: getAllElementsController()

> **getAllElementsController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/controllers/element.controller.ts#L40)

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
