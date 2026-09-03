[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [middlewares/private.middleware](../README.md) / privateUser

# Function: privateUser()

> **privateUser**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: [src/middlewares/private.middleware.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/middlewares/private.middleware.ts#L22)

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
