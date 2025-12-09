[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / addImage

# Function: addImage()

> **addImage**(`lessonId`, `requestorId`, `legend`, `source`, `alternative`, `allElements`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:328](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/element.service.ts#L328)

**`Function`**

Creates a new image element.

## Parameters

### lessonId

`number`

The ID of the lesson containing the image element.

### requestorId

`number`

The ID of the user who creates the image element.

### legend

The legend of the image to create, displaying on front-end.

`string` | `null`

### source

`string`

The image file name.

### alternative

`string`

The text used for the alternative attribut of the image on front-end.

### allElements

[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]

List of object containing all elements informations.

## Returns

`Promise`\<`void`\>

## Async

addImage

## Throws

If an unexpected error occurs during image element creation.
