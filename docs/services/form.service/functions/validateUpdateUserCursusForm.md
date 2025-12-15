[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateUserCursusForm

# Function: validateUpdateUserCursusForm()

> **validateUpdateUserCursusForm**(`userCursusId`, `requestorId`): `void`

Defined in: [src/services/form.service.ts:840](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/form.service.ts#L840)

**`Function`**

Checks validity of the update user-cursus form.

 validateUpdateUserCursusForm

## Parameters

### userCursusId

`number`

The ID of the user-cursus to update.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`void`

## Throws

If the user-cursus ID is null or not a number.

## Throws

If the requestor ID is null or not a number.

## Throws

If the user-cursus ID value < 1.

## Throws

If the requestor ID value < 1.
