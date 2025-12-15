[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / changeOrderElementsController

# Function: changeOrderElementsController()

> **changeOrderElementsController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:56](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/element.controller.ts#L56)

Handle element order update.

## Parameters

### req

`Request`

Express request containing the ID of the element to move and the movement ('up' | 'down') in URL parameters.

### res

`Response`

Express response containing the informations of all the elements.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the element informations in data property.
- 400 if movement is 'up' and element is at first position or if movement is 'down' with element at the last position.

## Route

GET /api/content/element/:id/:move

## Description

Steps:
- Checks that element ID is provided in URL params,
- Checks that move is provided in URL params and equals to 'up' | 'down',
- Change the order of the target element,
- Get all element informations.

## Throws

If no id provided in URL params.

## Throws

If move in URL param is not provided or different from 'up' | 'down'.
