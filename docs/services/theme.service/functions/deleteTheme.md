[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/theme.service](../README.md) / deleteTheme

# Function: deleteTheme()

> **deleteTheme**(`themeId`): `Promise`\<`void`\>

Defined in: [src/services/theme.service.ts:209](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/theme.service.ts#L209)

**`Function`**

Deletes a theme in the database with its ID and decreases other theme order by one.

## Parameters

### themeId

`number`

ID used to retrieve the theme to delete.

## Returns

`Promise`\<`void`\>

## Async

deleteTheme

## Throws

If the theme to delete is not found with the provided ID.

## Throws

If an unexpected error occurs during the theme deletion.
