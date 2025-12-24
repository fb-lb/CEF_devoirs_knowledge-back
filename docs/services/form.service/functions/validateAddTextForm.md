[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddTextForm

# Function: validateAddTextForm()

> **validateAddTextForm**(`textType`, `content`, `lessonId`): `void`

Defined in: [src/services/form.service.ts:529](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/form.service.ts#L529)

**`Function`**

Checks validity of the add text form fields.

 validateAddTextForm

## Parameters

### textType

`string`

The type of the text.

### content

`string`

The text displayed on front-end.

### lessonId

`number`

The ID of the lesson containing the text.

## Returns

`void`

## Throws

If content is null.

## Throws

If text type is null.

## Throws

If lesson id is null.

## Throws

If text type is not an allowed value : 'title1' || 'title2' || 'title3' || 'paragraph'.
