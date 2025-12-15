[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / setIsVerified

# Function: setIsVerified()

> **setIsVerified**(`id`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/user.service.ts:149](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user.service.ts#L149)

**`Function`**

Sets user isVerified property to true.

## Parameters

### id

`number`

The ID of the user to update.

## Returns

`Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Returns success: true if user isVerfied is successfully set to true.

## Async

setIsVerified

## Throws

If user to update is not found with provided ID.

## Throws

If an unexpected error occurs during the update.
