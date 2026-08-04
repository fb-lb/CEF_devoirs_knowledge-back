[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / changeOrderElements

# Function: changeOrderElements()

> **changeOrderElements**(`elementId`, `move`, `userId`): `Promise`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>\>

Defined in: [src/services/element.service.ts:230](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/element.service.ts#L230)

**`Function`**

Updates an element order property and swap with an element according to the move.

## Parameters

### elementId

`number`

The ID used to retrieve the element whose order must be updated.

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

changeOrderElements

## Throws

If the target element is not found with provided ID.

## Throws

If element to swap is not found in the database.

## Throws

If an unexpected error occurs during the update.
