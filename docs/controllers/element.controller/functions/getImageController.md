[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/element.controller](../README.md) / getImageController

# Function: getImageController()

> **getImageController**(`req`, `res`): `void`

Defined in: [src/controllers/element.controller.ts:251](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/element.controller.ts#L251)

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
