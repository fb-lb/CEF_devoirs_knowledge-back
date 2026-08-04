[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / isImageTokenValid

# Function: isImageTokenValid()

> **isImageTokenValid**(`token`): `void`

Defined in: [src/services/token.service.ts:90](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/token.service.ts#L90)

**`Function`**

Checks if a Json Web Token is valid by verifying the signature with image jwt secret.

 isImageTokenValid

## Parameters

### token

`string`

The Json Web Token to check.

## Returns

`void`

## Throws

If an unexpected error occurs during token validity verification.
