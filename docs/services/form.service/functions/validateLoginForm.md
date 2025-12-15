[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateLoginForm

# Function: validateLoginForm()

> **validateLoginForm**(`body`): `void`

Defined in: [src/services/form.service.ts:158](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/form.service.ts#L158)

**`Function`**

Checks validity of the login form fields.

 validateLoginForm

## Parameters

### body

Object containing the user informations {
  email: string;
  password: string;
}

#### email

`string`

#### password

`string`

## Returns

`void`

## Throws

If one of the body property is null.

## Throws

If email format is not followed.

## Throws

If email length > 80.

## Throws

If password length < 8.

## Throws

If password length > 100.

## Throws

If password contains unauthorized character.
