[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / addUserLessonController

# Function: addUserLessonController()

> **addUserLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/user-lesson.controller.ts#L25)

Handle user-lesson creation.

## Parameters

### req

`Request`

Express request containing the user-lesson informations in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

POST /api/user-lesson/add

## Description

Steps:
- Create the user-lesson if not already created,
- Create a user-cursus for the cursus containing the lesson if not already created,
- Create a user-theme for the theme containing the cursus if not already created.
