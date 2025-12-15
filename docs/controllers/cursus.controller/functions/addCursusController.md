[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / addCursusController

# Function: addCursusController()

> **addCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:122](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/cursus.controller.ts#L122)

Handle cursus creation.

## Parameters

### req

`Request`

Express request containing the cursus informations in the body.

### res

`Response`

Express response containing the informations of all the cursus.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the cursus informations in data property.

## Route

POST /api/content/cursus/add

## Description

Steps:
- Validates the cursus informations,
- Gets the requestor ID,
- Creates the new cursus,
- Get all cursus informations,
- Updates users' certification for the theme containing this new cursus.
