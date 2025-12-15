[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/lesson.controller](../README.md) / deleteLessonController

# Function: deleteLessonController()

> **deleteLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/lesson.controller.ts:155](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/lesson.controller.ts#L155)

Handle lesson deletion.

## Parameters

### req

`Request`

Express request containing the ID of the lesson to delete in URL parameter.

### res

`Response`

Express response containing the informations of all the lessons.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the lesson informations in data property.

## Route

DELETE /api/content/lesson/:id

## Description

Steps:
- Gets the ID of the theme containing the cursus which contains the lesson,
- Gets the ID of the cursus containing the lesson,
- Gets a list of users who have user-lesson associations related to this cursus,
- Deletes the user-lessons related to the lesson to delete,
- Deletes the target lesson,
- Updates users' validation for the cursus containing this lesson,
- Updates users' certification for the theme containing this cursus,
- Get all lesson informations.

## Throws

If cursus ID URL parameter is not provided.
