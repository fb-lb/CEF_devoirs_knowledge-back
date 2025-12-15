[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / updateLesson

# Function: updateLesson()

> **updateLesson**(`lessonId`, `newLessonName`, `newLessonPrice`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/lesson.service.ts:313](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/lesson.service.ts#L313)

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
