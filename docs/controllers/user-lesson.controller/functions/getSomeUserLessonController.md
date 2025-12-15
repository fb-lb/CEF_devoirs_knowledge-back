[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-lesson.controller](../README.md) / getSomeUserLessonController

# Function: getSomeUserLessonController()

> **getSomeUserLessonController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-lesson.controller.ts:92](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/user-lesson.controller.ts#L92)

Handle all user-lessons retrieval for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-lesson informations for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-lesson informations for a specific user in data property.

## Route

GET /api/user-lesson/some

## Description

Steps:
- Gets the ID of the requestor who is the user related to user-lesson to retrieve,
- Retrieves all user-lesson informations for a specific user.
