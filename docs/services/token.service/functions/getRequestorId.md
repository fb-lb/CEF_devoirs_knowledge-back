[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / getRequestorId

# Function: getRequestorId()

> **getRequestorId**(`token`): `number`

Defined in: [src/services/token.service.ts:69](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/token.service.ts#L69)

**`Function`**

Get the id of the user who sent a token, by checking payload informations.

## Parameters

### token

`string`

The token sotring the user ID.

## Returns

`number`

The user ID in the token payload.

## Async

getRequestorId

## Throws

If an unexptected error occurs during token decoding.
