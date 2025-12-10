[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / getAllUserLessonController

# Function: getAllUserLessonController()

> **getAllUserLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:67](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/user-lesson.controller.ts#L67)

Handle all user-lesson retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-lesson informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-lesson informations in data property.

## Route

GET /api/user-lesson/all

## Description

Steps:
- Retrieves all user-lesson informations.
