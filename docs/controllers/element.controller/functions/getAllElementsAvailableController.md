[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getAllElementsAvailableController

# Function: getAllElementsAvailableController()

> **getAllElementsAvailableController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:438](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/element.controller.ts#L438)

Handle the retrieval of the elements available for the user who made the request.

## Parameters

### req

`Request`

Express request the ID of the user concerned in the token cookie.

### res

`Response`

Express response containing the informations of the available elements for the requestor.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing the informations of the elements concerned in data property.

## Route

GET /api/content/element/user/all

## Description

Steps:
- Gets the ID of the requestor.
- Finds the available elements for the requestor.
