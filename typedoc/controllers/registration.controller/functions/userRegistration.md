[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/registration.controller](../README.md) / userRegistration

# Function: userRegistration()

> **userRegistration**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<[`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/registration.controller.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/controllers/registration.controller.ts#L25)

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
