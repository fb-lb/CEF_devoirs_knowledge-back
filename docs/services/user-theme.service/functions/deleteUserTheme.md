[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / deleteUserTheme

# Function: deleteUserTheme()

> **deleteUserTheme**(`userThemeId`): `Promise`\<`void`\>

Defined in: [src/services/user-theme.service.ts:375](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/user-theme.service.ts#L375)

**`Function`**

Deletes a user-theme and related user-cursus.

## Parameters

### userThemeId

`number`

The ID of the user-theme association to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteUserTheme

## Throws

If user-theme association is not found with the user-theme ID provided.

## Throws

If an unexpected error occurs during the deletion.
