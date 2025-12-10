[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/authentication.controller](../README.md) / logout

# Function: logout()

> **logout**(`req`, `res`): `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/controllers/authentication.controller.ts:60](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/authentication.controller.ts#L60)

Handle user logout request.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response.

## Returns

`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Returns :
- 200 if logout is successful (token, isAuth, isAdmin cookies are cleared).

## Route

GET /api/authentification/deconnexion

## Description

Steps :
- Clear token, isAuth, isAdmin cookies.
