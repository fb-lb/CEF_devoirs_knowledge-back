[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / addUserTheme

# Function: addUserTheme()

> **addUserTheme**(`userId`, `themeId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-theme.service.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/user-theme.service.ts#L25)

**`Function`**

Adds a user-theme association into the database.

## Parameters

### userId

`number`

The ID of the user related to the theme.

### themeId

`number`

The ID of the theme related to the user.

### requestorId

`number`

The ID of the user performing the creation.

## Returns

`Promise`\<`void`\>

## Async

addUserTheme

## Throws

If an unexpected error occurs during user-theme creation.
