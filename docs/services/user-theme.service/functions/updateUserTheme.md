[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / updateUserTheme

# Function: updateUserTheme()

> **updateUserTheme**(`userThemeId`, `isCertified`, `requestorId`): `Promise`\<`boolean`\>

Defined in: [src/services/user-theme.service.ts:311](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-theme.service.ts#L311)

**`Function`**

Updates a user-theme informations.

## Parameters

### userThemeId

`number`

The user-theme ID used to retrieve the user-theme association.

### isCertified

`boolean`

The new value of the user-theme certification property.

### requestorId

`number`

The ID of the user performing the update.

## Returns

`Promise`\<`boolean`\>

Returns `true` user-theme certification property is updated.
Returns `false` if user-cursus certification property is already equals to isCertified parameter.

## Async

updateUserTheme

## Throws

If the user-theme association to update is not found whith the user-theme assocation ID provided.

## Throws

If an unexpected error occurs during the update.
