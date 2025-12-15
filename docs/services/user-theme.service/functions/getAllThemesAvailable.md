[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / getAllThemesAvailable

# Function: getAllThemesAvailable()

> **getAllThemesAvailable**(`userId`): `Promise`\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>

Defined in: [src/services/user-theme.service.ts:138](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-theme.service.ts#L138)

**`Function`**

Retrieves all themes available for a specific user in the database.

## Parameters

### userId

`number`

The user ID used to retrieve the theme.

## Returns

`Promise`\<[`ThemeData`](../../../types/Interfaces/interfaces/ThemeData.md)[]\>

Returns a list of themes retrieved for the specified user.

## Async

getAllThemesAvailable

## Throws

If an unexpected error occurs during themes retrieval.
