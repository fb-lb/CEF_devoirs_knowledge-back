[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddCursusForm

# Function: validateAddCursusForm()

> **validateAddCursusForm**(`cursusName`, `themeId`, `price`): `void`

Defined in: [src/services/form.service.ts:367](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/form.service.ts#L367)

**`Function`**

Checks validity of the add cursus form fields.

 validateAddCursusForm

## Parameters

### cursusName

`string`

The name of the new cursus.

### themeId

`number`

The ID of the theme containing the cursus.

### price

`number`

The price of the cursus.

## Returns

`void`

## Throws

If cursus name or price is null.

## Throws

If theme id is null.

## Throws

If cursus name length > 255.

## Throws

If cursus name contains unauthorized caracters.

## Throws

If price value < 0.
