[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/user-cursus.controller](../README.md) / getSomeUserCursusController

# Function: getSomeUserCursusController()

> **getSomeUserCursusController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/user-cursus.controller.ts:88](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/controllers/user-cursus.controller.ts#L88)

Handle all user-cursus retrieval for a specific user.

## Parameters

### req

`Request`

Express request.

### res

`Response`

Express response containing all user-cursus informations for a specific user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with a list of objects containing user-cursus informations for a specific user in data property.

## Route

GET /api/user-cursus/some

## Description

Steps:
- Gets the ID of the requestor who is the user related to user-cursus to retrieve,
- Retrieves all user-cursus informations for a specific user.
