[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / updateTextController

# Function: updateTextController()

> **updateTextController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:348](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/element.controller.ts#L348)

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
