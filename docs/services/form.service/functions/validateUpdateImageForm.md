[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateImageForm

# Function: validateUpdateImageForm()

> **validateUpdateImageForm**(`newSource`, `newAlternative`): `void`

Defined in: [src/services/form.service.ts:749](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/form.service.ts#L749)

**`Function`**

Checks validity of the update image form.

 validateUpdateImageForm

## Parameters

### newSource

`string`

The new file name of the image.

### newAlternative

`string`

The new alternative text for the image alternative attribut.

## Returns

`void`

## Throws

If new alternative of the image is null.

## Throws

If new source of the image is null.

## Throws

If new source length > 255.

## Throws

If new alternative length > 255.
