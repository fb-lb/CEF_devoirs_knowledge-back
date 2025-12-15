[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddImageForm

# Function: validateAddImageForm()

> **validateAddImageForm**(`source`, `alternative`, `lessonId`): `void`

Defined in: [src/services/form.service.ts:477](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/form.service.ts#L477)

**`Function`**

Checks validity of the add image form fields.

 validateAddImageForm

## Parameters

### source

`string`

The file name.

### alternative

`string`

The alternative text used for the image alternative attribut.

### lessonId

`number`

The ID of the lesson containing the image.

## Returns

`void`

## Throws

If alternative is null.

## Throws

If source is null.

## Throws

If lesson id is null.

## Throws

If source length > 255.

## Throws

If alternative length > 255.
