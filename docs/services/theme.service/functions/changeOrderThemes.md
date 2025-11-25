[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/theme.service](../README.md) / changeOrderThemes

# Function: changeOrderThemes()

> **changeOrderThemes**(`themeId`, `move`, `userId`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/theme.service.ts:107](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/theme.service.ts#L107)

**`Function`**

Updates a theme order property and swap with a theme according to the move.

## Parameters

### themeId

`number`

The ID used to retrieve the theme whose order must be updated.

### move

Direction of the movement : 'up' decreases the order by 1 and 'down' increases it by 1.

`"up"` | `"down"`

### userId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Returns `{ success: false }` if the order update is not possible (first or last position)
and `{ success: true }` when the order has been successfully updated.

## Async

changeOrderThemes

## Throws

If the target theme is not found with provided ID.

## Throws

If theme to swap is not found in the database.

## Throws

If an unexpected error occurs during the update.
