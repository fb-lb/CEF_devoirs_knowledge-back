[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateRegistrationForm

# Function: validateRegistrationForm()

> **validateRegistrationForm**(`body`): `void`

Defined in: [src/services/form.service.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/form.service.ts#L34)

**`Function`**

Checks validity of the registration form fields.

 validateRegistrationForm

## Parameters

### body

[`RegistrationBody`](../../../types/Interfaces/interfaces/RegistrationBody.md)

Object containing the user informations {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

## Returns

`void`

## Throws

If one of the body property is null.

## Throws

If first name length > 60.

## Throws

If last name length > 60.

## Throws

If first name contains unauthorized caracters.

## Throws

If last name contains unauthorized caracters.

## Throws

If email format is not followed.

## Throws

If email length > 80.

## Throws

If password length < 8.

## Throws

If password length > 100.

## Throws

If password contains unauthorized caracters.

## Throws

If confirm password length < 8.

## Throws

If confirm password length > 100.

## Throws

If confirm password contains unauthorized caracters.

## Throws

If password and confirm password are not identical.
