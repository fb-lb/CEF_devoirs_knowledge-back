[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / updateCursusController

# Function: updateCursusController()

> **updateCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:221](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/cursus.controller.ts#L221)

Handle cursus update.

## Parameters

### req

`Request`

Express request containing the ID of the cursus to update in URL parameter.

### res

`Response`

Express response containing the informations of all the cursus.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the cursus informations in data property.

## Route

PATCH /api/content/cursus/:id

## Description

Steps:
- Validates the cursus informations,
- Updates the target cursus,
- Get all cursus informations.

## Throws

If cursus ID URL parameter is not provided.
