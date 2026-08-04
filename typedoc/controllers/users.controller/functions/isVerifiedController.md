[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / isVerifiedController

# Function: isVerifiedController()

> **isVerifiedController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`boolean`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:119](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/users.controller.ts#L119)

Check that has verified or not his email address.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`boolean`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code. For data :
- returns true if user is verified
- returns false if user is not verified

## Route

GET /api/utilisateurs/isVerified

## Description

Steps:
- Verifies that the requestor has verified his email address.

## Throws

If an unexpected error occurs.
