[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / changeOrderCursus

# Function: changeOrderCursus()

> **changeOrderCursus**(`cursusId`, `move`, `userId`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/cursus.service.ts:111](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/cursus.service.ts#L111)

**`Function`**

Updates a cursus order property and swap with a cursus according to the move.

## Parameters

### cursusId

`number`

The ID used to retrieve the cursus whose order must be updated.

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

changeOrderCursus

## Throws

If the target cursus is not found with provided ID.

## Throws

If cursus to swap is not found in the database.

## Throws

If an unexpected error occurs during the update.
