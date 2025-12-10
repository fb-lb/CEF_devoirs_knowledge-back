[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddImageForm

# Function: validateAddImageForm()

> **validateAddImageForm**(`source`, `alternative`, `lessonId`): `void`

Defined in: [src/services/form.service.ts:477](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/form.service.ts#L477)

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
