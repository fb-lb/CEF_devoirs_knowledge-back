[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / deleteElement

# Function: deleteElement()

> **deleteElement**(`elementId`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:418](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/element.service.ts#L418)

**`Function`**

Deletes an element in the database and the text or the image according to type element.
Decreases by one other element order in the same lesson if it is higher than the order of the element to delete.
If it is an image, it calls deleteImageFiles() function to delete file too.

## Parameters

### elementId

`number`

ID used to retrieve the element to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteElement

## Throws

If the element to delete is not found with the provided ID.

## Throws

If an unexpected error occurs during the theme deletion.
