[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / generateUserToken

# Function: generateUserToken()

> **generateUserToken**(`user`, `hours`): `string`

Defined in: [src/services/token.service.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/token.service.ts#L19)

**`Function`**

Generate a Json Web Token.

 generateUserToken

## Parameters

### user

[`UserData`](../../../types/Interfaces/interfaces/UserData.md)

Contains informations for the token payload.

### hours

`number` = `1`

number of hours that token is valid (1 by default).

## Returns

`string`

The Json Web Token generated.
