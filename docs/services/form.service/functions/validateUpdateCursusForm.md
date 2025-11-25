[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateCursusForm

# Function: validateUpdateCursusForm()

> **validateUpdateCursusForm**(`newCursusName`, `newCursusPrice`): `void`

Defined in: [src/services/form.service.ts:529](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/form.service.ts#L529)

**`Function`**

Checks validity of the update cursus form.

 validateUpdateCursusForm

## Parameters

### newCursusName

`string`

The new name of the cursus.

### newCursusPrice

`number`

The new price of the cursus.

## Returns

`void`

## Throws

If new cursus name or new cursus price is null.

## Throws

If cursus name length > 255.

## Throws

If cursus name contains a caracter not allowed.

## Throws

If cursus price value < 0.
