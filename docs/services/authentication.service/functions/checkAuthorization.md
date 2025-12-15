[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/authentication.service](../README.md) / checkAuthorization

# Function: checkAuthorization()

> **checkAuthorization**(`userId`, `role`): `Promise`\<`boolean`\>

Defined in: [src/services/authentication.service.ts:109](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/authentication.service.ts#L109)

**`Function`**

Retrieves a user whith provided ID and check if user has the desired role.

## Parameters

### userId

`number`

The ID of the user to retrieve.

### role

'user' to check if user is a user and 'admin' to check if user is an admin.

`"user"` | `"admin"`

## Returns

`Promise`\<`boolean`\>

True if user has the desired role, false otherwise.

## Async

checkAuthorization

## Throws

If user is not found with provided ID.

## Throws

If an unexpected error occurs during role verification.
