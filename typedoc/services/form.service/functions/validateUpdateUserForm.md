[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateUserForm

# Function: validateUpdateUserForm()

> **validateUpdateUserForm**(`body`): `void`

Defined in: [src/services/form.service.ts:235](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/form.service.ts#L235)

**`Function`**

Checks validity of the update user form fields.

 validateUpdateUserForm

## Parameters

### body

[`UpdateUserBody`](../../../types/Interfaces/interfaces/UpdateUserBody.md)

Object containing the user informations {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: ("user" | "admin")[];
  isVerified: boolean;
}

## Returns

`void`

## Throws

If at least one of the id, firstname, lastname or email body properties is null.

## Throws

If id value < 1.

## Throws

If id length > 20.

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
