[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [middlewares/private.middleware](../README.md) / privateAdmin

# Function: privateAdmin()

> **privateAdmin**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: [src/middlewares/private.middleware.ts:79](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/middlewares/private.middleware.ts#L79)

**`Function`**

Verifies that the request is sent by a user registered in the database with `admin` in his roles property.

## Parameters

### req

`Request`

Request received from the front-end, where the token is stored.

### res

`Response`

Response to send to the front-end in case the user is not an admin.

### next

`NextFunction`

Used to go on the next middleware.

## Returns

`Promise`\<`void`\>

Returns `Promise<void>` if requestor has `admin` in his roles property.
Returns `Promise<Promise<Response<ApiResponse>>>` user has not `admin` in his roles property.

## Async

privateAdmin
