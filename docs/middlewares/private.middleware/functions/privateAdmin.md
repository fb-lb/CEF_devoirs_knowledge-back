[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [middlewares/private.middleware](../README.md) / privateAdmin

# Function: privateAdmin()

> **privateAdmin**(`req`, `res`, `next`): `Promise`\<`void` \| `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/middlewares/private.middleware.ts:55](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/middlewares/private.middleware.ts#L55)

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

`Promise`\<`void` \| `Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns `Promise<void>` if requestor has `admin` in his roles property.
Returns `Promise<Promise<Response<ApiResponse>>>` user has not `admin` in his roles property.

## Async

privateAdmin
