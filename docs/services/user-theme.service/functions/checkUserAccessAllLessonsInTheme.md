[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / checkUserAccessAllLessonsInTheme

# Function: checkUserAccessAllLessonsInTheme()

> **checkUserAccessAllLessonsInTheme**(`userThemeId`): `Promise`\<`boolean`\>

Defined in: [src/services/user-theme.service.ts:239](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-theme.service.ts#L239)

**`Function`**

Checks if a user has access to all lessons in a theme.

## Parameters

### userThemeId

`number`

The user-theme association ID used to retrieve the theme to check.

## Returns

`Promise`\<`boolean`\>

Returns `true` if the user of the user-theme association has access to all lessons in the theme related
to the user-theme association. Otherwise, it returns `false`.

## Async

checkUserAccessAllLessonsInTheme

## Throws

If user-theme association is not retrieved width theme ID and user ID provided.

## Throws

If an unexpected error occurs during the checking.
