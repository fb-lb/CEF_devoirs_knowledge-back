[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [middlewares/private.middleware](../README.md) / privateUser

# Function: privateUser()

> **privateUser**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: [src/middlewares/private.middleware.ts:21](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/middlewares/private.middleware.ts#L21)

**`Function`**

Verifies that the request is sent by a user registered in the database by checking the token.

## Parameters

### req

`Request`

Request received from the front-end, where the token is stored.

### res

`Response`

Response where cookies are saved if user is connected.

### next

`NextFunction`

Used to go on the next middleware.

## Returns

`Promise`\<`void`\>

## Async

privateUser

## Throws

If requestor is not connected as a user.
