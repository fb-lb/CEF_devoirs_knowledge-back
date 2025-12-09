[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / addUserCursusController

# Function: addUserCursusController()

> **addUserCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/user-cursus.controller.ts#L26)

Handle user-cursus creation.

## Parameters

### req

`Request`

Express request containing the user-cursus informations in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`undefined`\>, `Record`\<`string`, `any`\>\>\>

Returns express response with 200 status code.

## Route

POST /api/user-cursus/add

## Description

Steps:
- Create the user-cursus if not already created,
- Create a user-lesson for each lesson in this cursus if not already created,
- Create a user-theme for the them containing the cursus if not already created.
