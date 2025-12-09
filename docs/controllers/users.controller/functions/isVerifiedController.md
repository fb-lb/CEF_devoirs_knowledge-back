[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/users.controller](../README.md) / isVerifiedController

# Function: isVerifiedController()

> **isVerifiedController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`boolean`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/users.controller.ts:127](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/users.controller.ts#L127)

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
