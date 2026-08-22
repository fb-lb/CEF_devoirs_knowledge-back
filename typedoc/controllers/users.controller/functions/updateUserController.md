[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / updateUserController

# Function: updateUserController()

> **updateUserController**(`req`, `res`): `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/controllers/users.controller.ts:55](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/users.controller.ts#L55)

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
