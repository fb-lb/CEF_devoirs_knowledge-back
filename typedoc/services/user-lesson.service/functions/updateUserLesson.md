[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / updateUserLesson

# Function: updateUserLesson()

> **updateUserLesson**(`userLessonId`, `requestorId`, `isValidated`): `Promise`\<`boolean`\>

Defined in: [src/services/user-lesson.service.ts:181](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-lesson.service.ts#L181)

**`Function`**

Updates a user-lesson informations.

## Parameters

### userLessonId

`number`

The user-lesson ID used to retrieve the user-lesson association.

### requestorId

`number`

The ID of the user performing the update.

### isValidated

`boolean`

The new value of the user-lesson validation property.

## Returns

`Promise`\<`boolean`\>

Returns `true` user-lesson validation property is updated.
Returns `false` if user-lesson validation property is already equals to isValidated parameter.

## Async

updateUserLesson

## Throws

If the user-lesson association to update is not found whith the user-lesson assocation ID provided.

## Throws

If an unexpected error occurs during the update.
