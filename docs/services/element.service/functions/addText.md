[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / addText

# Function: addText()

> **addText**(`lessonId`, `requestorId`, `textType`, `content`, `allElements`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:374](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/element.service.ts#L374)

**`Function`**

Creates a new text element.

## Parameters

### lessonId

`number`

The ID of the lesson containing the text element.

### requestorId

`number`

The ID of the user who creates the text element.

### textType

The type of the text element.

`"title1"` | `"title2"` | `"title3"` | `"paragraph"`

### content

`string`

The content of the text element, displayed on front-end.

### allElements

[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]

List of object containing all elements informations.

## Returns

`Promise`\<`void`\>

## Async

addText

## Throws

If an unexpected error occurs during text element creation.
