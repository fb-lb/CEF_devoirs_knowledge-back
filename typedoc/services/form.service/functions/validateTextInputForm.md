[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateTextInputForm

# Function: validateTextInputForm()

> **validateTextInputForm**(`value`, `required`, `fieldName`, `options?`): `void`

Defined in: [src/services/form.service.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L28)

**`Function`**

Checks validity of an input text form field.

 validateTextInputForm

## Parameters

### value

`string`

Input text value

### required

`boolean`

Specificy if this input value is required

### fieldName

`string`

The input field name used in error message

### options?

Object containing optional rules for validation {
  minLength?: number,
  maxLength?: number,
  regex?: RegExp,
  email?: boolean,
}

#### email?

`boolean`

#### maxLength?

`number`

#### minLength?

`number`

#### regex?

`RegExp`

## Returns

`void`

## Throws

If value is required and null.

## Throws

If value length > maxLength provided.

## Throws

If value length < minLength provided.

## Throws

If value unauthorized caracters specified by provided regex.

## Throws

If value is an email and don't have the right format.
