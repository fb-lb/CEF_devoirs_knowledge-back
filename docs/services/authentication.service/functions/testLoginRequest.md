[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/authentication.service](../README.md) / testLoginRequest

# Function: testLoginRequest()

> **testLoginRequest**(`email`, `password`): `Promise`\<`string` \| \{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Defined in: [src/services/authentication.service.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/authentication.service.ts#L22)

**`Function`**

Login test. Retrieves a user whith the provided email and check if password provided and password of the retrieved user are the same.

## Parameters

### email

`string`

Email used to retrieve user trying to login.

### password

`string`

Password compared to password of retrieved user to check user authentication.

## Returns

`Promise`\<`string` \| \{ `createdAt`: `string`; `email`: `string`; `firstName`: `string`; `id`: `number`; `isVerified`: `boolean`; `lastName`: `string`; `roles`: (`"user"` \| `"admin"`)[]; `updatedAt`: `string`; `updatedBy`: `number` \| `null`; \}\>

Returns Promise<string> if no user retrieved with the provided email
and Promise<MyCheckingPayload['user']> if email and password match with a user in the database.

## Async

testLoginRequest

## Throws

If an unexpected error occurs during the login test.
