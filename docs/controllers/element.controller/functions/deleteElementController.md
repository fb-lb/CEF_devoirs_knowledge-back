[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / deleteElementController

# Function: deleteElementController()

> **deleteElementController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:216](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/element.controller.ts#L216)

Handle element deletion.

## Parameters

### req

`Request`

Express request containing the ID of the element to delete in URL parameter.

### res

`Response`

Express response containing the informations of all the element.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the element informations in data property.

## Route

DELETE /api/content/element/:id

## Description

Steps:
- Deletes the target element,
- Get all element informations.

## Throws

If element ID URL parameter is not provided.
