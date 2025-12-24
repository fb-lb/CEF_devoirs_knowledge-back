[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / getAllLessonsAvailable

# Function: getAllLessonsAvailable()

> **getAllLessonsAvailable**(`userId`): `Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>

Defined in: [src/services/user-lesson.service.ts:145](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-lesson.service.ts#L145)

**`Function`**

Retrieves all lessons available for a specific user in the database.

## Parameters

### userId

`number`

The user ID used to retrieve the lessons.

## Returns

`Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>

Returns a list of lessons retrieved for the specified user.

## Async

getAllLessonsAvailable

## Throws

If an unexpected error occurs during lessons retrieval.
