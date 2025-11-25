[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / getLesson

# Function: getLesson()

> **getLesson**(`lessonId`): `Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)\>

Defined in: [src/services/lesson.service.ts:102](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/lesson.service.ts#L102)

**`Function`**

Retrieves a lesson in the database with its ID.

## Parameters

### lessonId

`number`

The ID used to retrieve the lesson.

## Returns

`Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)\>

An object containing the lesson informations.

## Async

getLesson

## Throws

If the lesson is not found with provided ID.

## Throws

If an error occurs during lesson retrieval.
