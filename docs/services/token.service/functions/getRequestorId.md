[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / getRequestorId

# Function: getRequestorId()

> **getRequestorId**(`token`): `number`

Defined in: [src/services/token.service.ts:66](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/token.service.ts#L66)

**`Function`**

Get the id of the user who sent a token, by checking payload informations.

 getRequestorId

## Parameters

### token

`string`

The token sotring the user ID.

## Returns

`number`

The user ID in the token payload.

## Throws

If an unexptected error occurs during token decoding.
