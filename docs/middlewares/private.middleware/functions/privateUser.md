[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [middlewares/private.middleware](../README.md) / privateUser

# Function: privateUser()

> **privateUser**(`req`, `res`, `next`): `Promise`\<`void` \| `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>\>

Defined in: [src/middlewares/private.middleware.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/middlewares/private.middleware.ts#L19)

**`Function`**

Verifies that the request is sent by a user registered in the database by checking the token.

## Parameters

### req

`Request`

Request received from the front-end, where the token is stored.

### res

`Response`

Response to send to the front-end in case the user is not a user.

### next

`NextFunction`

Used to go on the next middleware.

## Returns

`Promise`\<`void` \| `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>\>

Returns `Promise<void>` if requestor has `user` in his roles property.
Returns `Promise<Promise<Response<ApiResponse>>>` user has not `user` in his roles property.

## Async

privateUser
