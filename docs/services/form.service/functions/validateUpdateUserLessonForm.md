[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateUserLessonForm

# Function: validateUpdateUserLessonForm()

> **validateUpdateUserLessonForm**(`userLessonId`, `requestorId`): `void`

Defined in: [src/services/form.service.ts:885](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/form.service.ts#L885)

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
