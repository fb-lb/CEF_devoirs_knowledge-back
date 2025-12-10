[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/token.service](../README.md) / generateToken

# Function: generateToken()

> **generateToken**(`user`): `string`

Defined in: [src/services/token.service.ts:17](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/token.service.ts#L17)

**`Function`**

Generate a Json Web Token.

 generateToken

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
