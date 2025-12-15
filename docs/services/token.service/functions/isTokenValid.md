[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / isTokenValid

# Function: isTokenValid()

> **isTokenValid**(`token`): [`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Defined in: [src/services/token.service.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/token.service.ts#L33)

**`Function`**

Checks if a Json Web Token is valid by verifying the signature.

 isTokenValid

## Parameters

### token

`string`

The Json Web Token to check.

## Returns

[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Success: true, message: "", data: the token payload containing the user informations.

## Throws

If an unexpected error occurs during token validity verification.
