[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/lesson.controller](../README.md) / addLessonController

# Function: addLessonController()

> **addLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/lesson.controller.ts:124](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/lesson.controller.ts#L124)

Handle lesson creation.

## Parameters

### req

`Request`

Express request containing the lesson informations in the body.

### res

`Response`

Express response containing the informations of all the lessons.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing all the lesson informations in data property.

## Route

POST /api/content/lesson/add

## Description

Steps:
- Validates the lesson informations,
- Gets the requestor ID,
- Creates the new lesson,
- Get all lesson informations,
- Updates cursus validation and theme certification for users who have access to this lesson.
