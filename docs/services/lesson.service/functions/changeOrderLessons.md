[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / changeOrderLessons

# Function: changeOrderLessons()

> **changeOrderLessons**(`lessonId`, `move`, `userId`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/lesson.service.ts:153](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/lesson.service.ts#L153)

**`Function`**

Updates a lesson order property and swap with a lesson according to the move.

## Parameters

### lessonId

`number`

The ID used to retrieve the lesson whose order must be updated.

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

changeOrderLessons

## Throws

If the target lesson is not found with provided ID.

## Throws

If lesson to swap is not found in the database.

## Throws

If an unexpected error occurs during the update.
