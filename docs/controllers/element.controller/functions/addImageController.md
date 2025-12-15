[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / addImageController

# Function: addImageController()

> **addImageController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:100](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/element.controller.ts#L100)

Handle image element creation.

## Parameters

### req

`Request`

Express request containing the image element informations in the body.

### res

`Response`

Express response containing the informations of all the elements.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the element informations in data property.

## Route

POST /api/content/element/image/add

## Description

Steps:
- Validates the image element informations,
- Gets the requestor ID,
- Creates the new image element,
- Get all elements informations.

## Throws

If req.file.filename is null or undefined, meaning that file saving failed.
