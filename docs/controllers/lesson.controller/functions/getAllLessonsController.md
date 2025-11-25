[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/lesson.controller](../README.md) / getAllLessonsController

# Function: getAllLessonsController()

> **getAllLessonsController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/lesson.controller.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/lesson.controller.ts#L26)

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
