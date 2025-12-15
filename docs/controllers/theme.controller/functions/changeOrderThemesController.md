[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/theme.controller](../README.md) / changeOrderThemesController

# Function: changeOrderThemesController()

> **changeOrderThemesController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/theme.controller.ts:54](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/theme.controller.ts#L54)

Handle theme order update.

## Parameters

### req

`Request`

Express request containing the ID of the theme to move and the movement ('up' | 'down') in URL parameters.

### res

`Response`

Express response containing the informations of all the themes.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the theme informations in data property.
- 400 if movement is 'up' and theme is at first position or if movement is 'down' with theme at the last position.

## Route

GET /api/content/theme/:id/:move

## Description

Steps:
- Checks that theme ID is provided in URL params,
- Checks that move is provided in URL params and equals to 'up' | 'down',
- Change the order of the target theme,
- Get all theme informations.

## Throws

If no id provided in URL params.

## Throws

If move in URL param is not provided or different from 'up' | 'down'.
