[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateTextForm

# Function: validateUpdateTextForm()

> **validateUpdateTextForm**(`newTextType`, `newContent`): `void`

Defined in: [src/services/form.service.ts:556](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L556)

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
