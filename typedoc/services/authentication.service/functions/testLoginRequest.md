[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/authentication.service](../README.md) / testLoginRequest

# Function: testLoginRequest()

> **testLoginRequest**(`email`, `password`): `Promise`\<`string` \| [`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>

Defined in: [src/services/authentication.service.ts:21](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/authentication.service.ts#L21)

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

`Promise`\<`string` \| [`UserData`](../../../types/Interfaces/interfaces/UserData.md)\>

Returns Promise<string> if no user retrieved with the provided email
and Promise<UserData> if email and password match with a user in the database.

## Async

testLoginRequest

## Throws

If an unexpected error occurs during the login test.
