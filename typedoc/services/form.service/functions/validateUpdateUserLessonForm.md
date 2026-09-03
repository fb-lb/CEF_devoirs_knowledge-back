[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateUserLessonForm

# Function: validateUpdateUserLessonForm()

> **validateUpdateUserLessonForm**(`userLessonId`, `requestorId`): `void`

Defined in: [src/services/form.service.ts:732](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L732)

**`Function`**

Checks validity of the update user-lesson form.

 validateUpdateUserLessonForm

## Parameters

### userLessonId

`number`

The ID of the user-lesson to update.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`void`

## Throws

If the user-lesson ID is null or not a number.

## Throws

If the requestor ID is null or not a number.

## Throws

If the user-lesson ID value < 1.

## Throws

If the requestor ID value < 1.
