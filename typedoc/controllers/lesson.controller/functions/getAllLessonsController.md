[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/lesson.controller](../README.md) / getAllLessonsController

# Function: getAllLessonsController()

> **getAllLessonsController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/lesson.controller.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/lesson.controller.ts#L39)

Handle all lessons retrieval.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all lesson informations.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing lesson informations in data property.

## Route

GET /api/content/lesson/all

## Description

Steps:
- Retrieves all lesson informations.
