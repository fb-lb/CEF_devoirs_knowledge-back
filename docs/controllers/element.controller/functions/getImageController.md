[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getImageController

# Function: getImageController()

> **getImageController**(`req`, `res`): `void`

Defined in: [src/controllers/element.controller.ts:251](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/element.controller.ts#L251)

Handle one image retrieval.

## Parameters

### req

`Request`

Express request containing the file name of the image to retrieve in URL parameter.

### res

`Response`

Express response, sending the file.

## Returns

`void`

## Route

GET /api/content/element/image/public/:filename

## Route

GET /api/content/element/image/private/:filename

## Description

Steps:
- Retrieves the image file with the provided file name.

## Throws

If file name is not provided in url parameter.

## Throws

If file is not found with provided file name.
