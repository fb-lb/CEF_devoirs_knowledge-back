[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/registration.controller](../README.md) / checkEmail

# Function: checkEmail()

> **checkEmail**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/registration.controller.ts:63](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/registration.controller.ts#L63)

Handle the user email address verification.

## Parameters

### req

`Request`

Express request containing the user informations in the body.

### res

`Response`

Express response containing the informations of the new user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns: 200.

## Route

POST /api/inscription/check-email

## Description

Steps:
- Checks token validity,
- Sets isVerified property to true for the user related to the token.
