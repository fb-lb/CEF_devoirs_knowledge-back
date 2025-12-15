[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/authentication.service](../README.md) / setCookies

# Function: setCookies()

> **setCookies**(`res`, `token`, `isAdmin`): `Response`

Defined in: [src/services/authentication.service.ts:70](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/authentication.service.ts#L70)

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
