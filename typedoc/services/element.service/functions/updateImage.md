[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / updateImage

# Function: updateImage()

> **updateImage**(`elementId`, `newAlternative`, `newLegend`, `newSource`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:673](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/element.service.ts#L673)

**`Function`**

Updates an image and relative element retrieved with the provided ID.

## Parameters

### elementId

`number`

The ID of the element used to retrieve the element and the image.

### newAlternative

`string`

The new alternative text of the image.

### newLegend

The new legend of the image.

`string` | `null`

### newSource

`string`

The new file name of the image.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`void`\>

## Async

updateImage

## Throws

If the element is not found with the provided ID.

## Throws

If the image to update is not found with the provided ID.

## Throws

If an unexecpted error occurs during the update.
