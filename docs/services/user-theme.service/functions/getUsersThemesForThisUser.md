[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / getUsersThemesForThisUser

# Function: getUsersThemesForThisUser()

> **getUsersThemesForThisUser**(`requestorId`): `Promise`\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>

Defined in: [src/services/user-theme.service.ts:96](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-theme.service.ts#L96)

**`Function`**

Retrieves all user-theme associations for a specific user in the database.

## Parameters

### requestorId

`number`

The user ID used to retrieve the user-theme associations.

## Returns

`Promise`\<[`UserThemeData`](../../../types/Interfaces/interfaces/UserThemeData.md)[]\>

Returns a list of objects containing the user-theme associations retrieved for the specified user.

## Async

getUsersThemesForThisUser

## Throws

If an unexpected error occurs during user-theme associations retrieval.
