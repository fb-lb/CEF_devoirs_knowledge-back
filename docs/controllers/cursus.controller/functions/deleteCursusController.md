[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / deleteCursusController

# Function: deleteCursusController()

> **deleteCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:174](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/cursus.controller.ts#L174)

Handle cursus deletion.

## Parameters

### req

`Request`

Express request containing the ID of the cursus to delete in URL parameter.

### res

`Response`

Express response containing the informations of all the cursus.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the cursus informations in data property.

## Route

DELETE /api/content/cursus/:id

## Description

Steps:
- Gets the ID of the theme containing the cursus,
- Gets a list of users who have user-cursus associations related to this theme,
- Deletes the user-cursus related to the cursus to delete,
- Deletes the targeted cursus,
- Updates users' certification for the theme containing this cursus,
- Get all cursus informations.

## Throws

If cursus ID URL parameter is not provided.
