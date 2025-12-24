[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / deleteUserLessonController

# Function: deleteUserLessonController()

> **deleteUserLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:219](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/user-lesson.controller.ts#L219)

Handle user-lesson deletion.

## Parameters

### req

`Request`

Express request containing the ID of the user-lesson to delete in URL parameter.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

DELETE /api/user-lesson/:userLessonId

## Description

Steps:
- Deletes the targeted user-lesson.

## Throws

If user-lesson relation is not found with the provided ID.
