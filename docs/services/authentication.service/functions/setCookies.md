[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/authentication.service](../README.md) / setCookies

# Function: setCookies()

> **setCookies**(`res`, `token`, `isAdmin`): `Response`

Defined in: [src/services/authentication.service.ts:70](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/authentication.service.ts#L70)

**`Function`**

Set new cookies in the response. An admin cookie is set if isAdmin is true.

## Parameters

### res

`Response`

Http Response where cookies are setting.

### token

`string`

JsonWebToken stored in the cookie.

### isAdmin

`boolean`

True if the user is an admin, otherwise false

## Returns

`Response`

The Http Response with stored cookies.

## Async

setCookies
