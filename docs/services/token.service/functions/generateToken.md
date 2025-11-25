[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / generateToken

# Function: generateToken()

> **generateToken**(`user`): `string`

Defined in: [src/services/token.service.ts:18](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/token.service.ts#L18)

**`Function`**

Generate a Json Web Token.

## Parameters

### user

The token payload.

#### createdAt

`string`

#### email

`string`

#### firstName

`string`

#### id

`number`

#### isVerified

`boolean`

#### lastName

`string`

#### roles

(`"user"` \| `"admin"`)[]

#### updatedAt

`string`

#### updatedBy

`number` \| `null`

## Returns

`string`

The Json Web Token generated.

## Async

generateToken
