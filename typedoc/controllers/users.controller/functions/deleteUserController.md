[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / deleteUserController

# Function: deleteUserController()

> **deleteUserController**(`req`, `res`): `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/controllers/users.controller.ts:84](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/users.controller.ts#L84)

Handle user deletion.

## Parameters

### req

`Request`

Express request containing the ID of the user to delete in URL parameter.

### res

`Response`

Express response.

## Returns

`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Returns express response with 200 status code.

## Route

DELETE /api/utilisateurs/:id

## Description

Steps:
- Deletes the targeted user.

## Throws

If user ID URL parameter is not provided.
