[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / updateText

# Function: updateText()

> **updateText**(`elementId`, `newTextType`, `newContent`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:583](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/element.service.ts#L583)

**`Function`**

Updates a text and relative element retrieved with the provided ID.

## Parameters

### elementId

`number`

The Id of the element used to retrieve element and text.

### newTextType

The new type of the text.

`"title1"` | `"title2"` | `"title3"` | `"paragraph"`

### newContent

`string`

The new content of the text.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`void`\>

## Async

updateText

## Throws

If the element is not found with the provided ID.

## Throws

If the text to update is not found with the provided ID.

## Throws

If an unexecpted error occurs during the update.
