[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/registration.controller](../README.md) / userRegistration

# Function: userRegistration()

> **userRegistration**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/registration.controller.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/controllers/registration.controller.ts#L25)

Handle user creation.

## Parameters

### req

`Request`\<\{ \}, \{ \}, [`RegistrationBody`](../../../types/Interfaces/interfaces/RegistrationBody.md)\>

Express request containing the user informations in the body.

### res

`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>\>

Express response containing the informations of the new user.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<\{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>, `Record`\<`string`, `any`\>\>\>

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
