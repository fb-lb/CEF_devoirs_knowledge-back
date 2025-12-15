[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / deleteImageFiles

# Function: deleteImageFiles()

> **deleteImageFiles**(`type`, `id`): `Promise`\<`void`\>

Defined in: [src/services/element.service.ts:466](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/element.service.ts#L466)

**`Function`**

Deletes image files related to the elements contained in a course ('theme' | 'cursus' | 'lesson' | 'element') retrieved with provided ID.

## Parameters

### type

The type of course which contains files to delete.

`"element"` | `"lesson"` | `"cursus"` | `"theme"`

### id

`number`

The ID of the course used to retrieve the course ('theme' | 'cursus' | 'lesson' | 'element').

## Returns

`Promise`\<`void`\>

## Async

deleteImageFiles

## Throws

If file to delete is not found with the source property of the element retrieved.

## Throws

If an unexpected error occurs during file deletion.
