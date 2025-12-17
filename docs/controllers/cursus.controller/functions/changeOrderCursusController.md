[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/cursus.controller](../README.md) / changeOrderCursusController

# Function: changeOrderCursusController()

> **changeOrderCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/cursus.controller.ts:79](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/cursus.controller.ts#L79)

Handle cursus order update.

## Parameters

### req

`Request`

Express request containing the ID of the cursus to move and the movement ('up' | 'down') in URL parameters.

### res

`Response`

Express response containing the informations of all the cursus.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the cursus informations in data property.
- 400 if movement is 'up' and cursus is at first position or if movement is 'down' with cursus at the last position.

## Route

GET /api/content/cursus/:id/:move

## Description

Steps:
- Checks that cursus ID is provided in URL params,
- Checks that move is provided in URL params and equals to 'up' | 'down',
- Change the order of the target cursus,
- Get all cursus informations.

## Throws

If no id provided in URL params.

## Throws

If move in URL param is not provided or different from 'up' | 'down'.
