[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getPrivateImageController

# Function: getPrivateImageController()

> **getPrivateImageController**(`req`, `res`): `void`

Defined in: [src/controllers/element.controller.ts:305](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/element.controller.ts#L305)

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

GET /api/content/element/image/public/:filename/:token

## Route

GET /api/content/element/image/private/:filename/:token

## Description

Steps:
- Check image token validity.
- Retrieves the image file with the provided file name.

## Throws

If file name is not provided in url parameter.

## Throws

If token is not provided in url parameter.

## Throws

If file is not found with provided file name.
