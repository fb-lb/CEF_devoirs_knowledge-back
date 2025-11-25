[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / deleteUserLessonForThisLesson

# Function: deleteUserLessonForThisLesson()

> **deleteUserLessonForThisLesson**(`lessonId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-lesson.service.ts:346](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user-lesson.service.ts#L346)

**`Function`**

Deletes all user-lesson associations related to a lesson.

## Parameters

### lessonId

`number`

The ID of the lesson related to all user-lesson associations to delete.

### requestorId

`number`

The ID of the user performing the deletion.

## Returns

`Promise`\<`void`\>

## Async

deleteUserLessonForThisLesson

## Throws

If an expected error occurs during the user-lesson deletions.
