[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/registration.controller](../README.md) / userRegistration

# Function: userRegistration()

> **userRegistration**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/registration.controller.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/controllers/registration.controller.ts#L25)

Handle user creation.

## Parameters

### req

`Request`\<\{ \}, \{ \}, [`RegistrationBody`](../../../types/Interfaces/interfaces/RegistrationBody.md)\>

Express request containing the user informations in the body.

### res

`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>\>

Express response containing the informations of the new user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>, `Record`\<`string`, `any`\>\>\>

Returns:
- 200 with an object containing the new user informations in data property.

## Route

POST /api/inscription

## Description

Steps:
- Validates the user informations,
- Creates the new user,
- Generate a token,
- Send an email to the user email address with a link containing the token to validate his email address and his account.
