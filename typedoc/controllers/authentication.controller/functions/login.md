[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/authentication.controller](../README.md) / login

# Function: login()

> **login**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/authentication.controller.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/authentication.controller.ts#L24)

Handle user login request.

## Parameters

### req

`Request`\<\{ \}, \{ \}, [`LoginBody`](../../../types/Interfaces/interfaces/LoginBody.md)\>

Express request containing email and password in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 if login is successful (token + Authorization header set).
- 401 if credentials are invalid or user email is not verified.

## Route

POST /api/authentification/connexion

## Description

Steps:
- Validate credentials via `testLoginRequest`,
- Generate a JWT token,
- Set Authorization header (token).
