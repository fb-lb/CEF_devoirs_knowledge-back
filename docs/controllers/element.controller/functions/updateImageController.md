[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / updateImageController

# Function: updateImageController()

> **updateImageController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/element.controller.ts:342](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/element.controller.ts#L342)

Handle image element update.

## Parameters

### req

`Request`

Express request containing the ID of the image element to update in URL parameter.

### res

`Response`

Express response containing the informations of all the ekements.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the element informations in data property.

## Route

PATCH /api/content/element/image/:id

## Description

Steps:
- Retrieve the image element to update,
- Validates the image element informations,
- Replace the saved file by the file sent if file name has changed,
- Updates the targeted image element,
- Get all element informations.

## Throws

If req.file.filename is null or undefined, meaning that file saving failed.

## Throws

If image element is not found with the provided ID.

## Throws

If element found is not an image.

## Throws

If a file deletion failed.

## Throws

If an unpexcted error occurs during the update.
