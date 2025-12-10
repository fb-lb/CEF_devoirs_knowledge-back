[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / deleteLesson

# Function: deleteLesson()

> **deleteLesson**(`lessonId`): `Promise`\<`void`\>

Defined in: [src/services/lesson.service.ts:261](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/lesson.service.ts#L261)

**`Function`**

Deletes a lesson in the database with its ID, image files related to this lesson in this cursus and decreases by one order of the other lessons in the same cursus
if they ihgher than the order of the lesson to delete.

## Parameters

### lessonId

`number`

ID used to retrieve the lesson to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteLesson

## Throws

If the lesson to delete is not found with the provided ID.

## Throws

If an unexpected error occurs during the lesson deletion.
