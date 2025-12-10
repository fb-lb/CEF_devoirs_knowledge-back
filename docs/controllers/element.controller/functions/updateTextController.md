[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / updateTextController

# Function: updateTextController()

> **updateTextController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:290](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/element.controller.ts#L290)

Handle text element update.

## Parameters

### req

`Request`

Express request containing the ID of the text element to update in URL parameter.

### res

`Response`

Express response containing the informations of all the ekements.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the element informations in data property.

## Route

PATCH /api/content/element/text/:id

## Description

Steps:
- Validates the text element informations,
- Updates the targeted text element,
- Get all element informations.

## Throws

If element ID URL parameter is not provided.
