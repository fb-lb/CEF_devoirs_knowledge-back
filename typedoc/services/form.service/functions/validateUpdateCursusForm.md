[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateCursusForm

# Function: validateUpdateCursusForm()

> **validateUpdateCursusForm**(`newCursusName`, `newCursusPrice`): `void`

Defined in: [src/services/form.service.ts:485](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L485)

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
