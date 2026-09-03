[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateNumberInputForm

# Function: validateNumberInputForm()

> **validateNumberInputForm**(`value`, `required`, `fieldName`, `options?`): `void`

Defined in: [src/services/form.service.ts:64](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L64)

**`Function`**

Checks validity of an input number form field.

 validateNumberInputForm

## Parameters

### value

`number`

Input number value

### required

`boolean`

Specificy if this input value is required

### fieldName

`string`

The input field name used in error message

### options?

Object containing optional rules for validation {
  minValue?: number,
}

#### minValue?

`number`

## Returns

`void`

## Throws

If value is required and null.

## Throws

If value < minValue provided.
