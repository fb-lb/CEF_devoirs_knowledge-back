[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / updateUserLessonController

# Function: updateUserLessonController()

> **updateUserLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:144](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/user-lesson.controller.ts#L144)

Handle user-lesson update.

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

PATCH /api/user-lesson/:userLessonId

## Description

Steps:
- Validate update user-lesson informations,
- Updates the user-lesson isVerified property.
