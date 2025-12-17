[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / updateLesson

# Function: updateLesson()

> **updateLesson**(`lessonId`, `newLessonName`, `newLessonPrice`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/lesson.service.ts:313](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/lesson.service.ts#L313)

**`Function`**

Update a lesson retrieved by its ID.

## Parameters

### lessonId

`number`

The ID of the lesson to update.

### newLessonName

`string`

The new name of the lesson to update.

### newLessonPrice

`number`

The new price of the lesson to update.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`void`\>

## Async

updateLesson

## Throws

If the lesson to update is not found with the provided ID.

## Throws

If an unexpected error occurs during the update.
