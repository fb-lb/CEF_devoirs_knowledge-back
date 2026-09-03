[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / setIsVerified

# Function: setIsVerified()

> **setIsVerified**(`id`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/user.service.ts:151](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/user.service.ts#L151)

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
