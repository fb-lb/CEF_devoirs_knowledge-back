[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / updateUserController

# Function: updateUserController()

> **updateUserController**(`req`, `res`): `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/controllers/users.controller.ts:55](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/controllers/users.controller.ts#L55)

Handle user update.

## Parameters

### req

`Request`

Express request containing the ID of the user to update in URL parameter.

### res

`Response`

Express response.

## Returns

`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Returns express response with 200 status code.

## Route

PATCH /api/utilisateurs/:id

## Description

Steps:
- Validates the user informations,
- Updates the target user.

## Throws

If cursus ID URL parameter is not provided.
