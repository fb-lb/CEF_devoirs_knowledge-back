[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / deleteUserLesson

# Function: deleteUserLesson()

> **deleteUserLesson**(`userLessonId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-lesson.service.ts:241](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-lesson.service.ts#L241)

**`Function`**

Deletes a user-lesson. Check if user-cursus related to the user-lesson has still user-lesson under it.
If not it deletes the user-cursus, otherwise it checks its isValidated property.
If user-cursus is deleted, it checks if user-theme related to the user-cursus has still user-cursus under it.
If not it deletes the user-theme, otherwise it checks its isCertified property.

## Parameters

### userLessonId

`number`

The ID of the user-lesson association to delete.

### requestorId

`number`

The ID of the user performing the deletion.

## Returns

`Promise`\<`void`\>

## Async

deleteUserLesson

## Throws

If user-lesson association is not found with the user-lesson ID provided.

## Throws

If user-cursus association related to the user-lesson association is not found.

## Throws

If user-theme association related to the user-cursus association is not found.

## Throws

If an unexpected error occurs during the deletion.
