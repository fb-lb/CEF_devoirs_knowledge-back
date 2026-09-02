[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / isUserTokenValid

# Function: isUserTokenValid()

> **isUserTokenValid**(`token`): [`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`TokenPayload`](../../../types/Interfaces/interfaces/TokenPayload.md)\>

Defined in: [src/services/token.service.ts:57](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/token.service.ts#L57)

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
