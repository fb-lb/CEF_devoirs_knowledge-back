[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / getAllLessonsAvailableController

# Function: getAllLessonsAvailableController()

> **getAllLessonsAvailableController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:118](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/user-lesson.controller.ts#L118)

Handle retrieval of all available lesson for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all lessons available for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing informations on available lessons for a specific user in data property.

## Route

GET /api/user-lesson/lesson/all

## Description

Steps:
- Gets the ID of the requestor who is the user related to the lessons to retrieve,
- Retrieves informations on all available lessons for a specific user.
