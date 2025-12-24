[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateTextForm

# Function: validateUpdateTextForm()

> **validateUpdateTextForm**(`newTextType`, `newContent`): `void`

Defined in: [src/services/form.service.ts:709](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/form.service.ts#L709)

**`Function`**

Checks validity of the update text form.

 validateUpdateTextForm

## Parameters

### newTextType

`string`

The new type  of the text.

### newContent

`string`

The new content of the text.

## Returns

`void`

## Throws

If new text type is null.

## Throws

If new text content is null.

## Throws

If new text type value is not allowed : 'title1' | 'title2' | 'title3' | 'paragraph'.
