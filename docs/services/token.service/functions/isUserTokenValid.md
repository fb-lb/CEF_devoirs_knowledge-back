[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / isUserTokenValid

# Function: isUserTokenValid()

> **isUserTokenValid**(`token`): [`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`TokenPayload`](../../../types/Interfaces/interfaces/TokenPayload.md)\>

Defined in: [src/services/token.service.ts:57](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/token.service.ts#L57)

**`Function`**

Checks if a Json Web Token is valid by verifying the signature with user jwt secret.

 isUserTokenValid

## Parameters

### token

`string`

The Json Web Token to check.

## Returns

[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`TokenPayload`](../../../types/Interfaces/interfaces/TokenPayload.md)\>

Success: true, message: "", data: the token payload containing the user informations.

## Throws

If an unexpected error occurs during token validity verification.
