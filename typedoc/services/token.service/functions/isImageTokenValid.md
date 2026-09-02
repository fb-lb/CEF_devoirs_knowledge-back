[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / isImageTokenValid

# Function: isImageTokenValid()

> **isImageTokenValid**(`token`): `void`

Defined in: [src/services/token.service.ts:90](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/token.service.ts#L90)

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
