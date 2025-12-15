[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / getUsersWhoHaveUserCursusForThisTheme

# Function: getUsersWhoHaveUserCursusForThisTheme()

> **getUsersWhoHaveUserCursusForThisTheme**(`themeId`): `Promise`\<[`User`](../../../models/User/classes/User.md)[]\>

Defined in: [src/services/user-cursus.service.ts:473](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-cursus.service.ts#L473)

Retrieves the users who have a user-cursus association related to a specific theme.

## Parameters

### themeId

`number`

The ID of the theme used to retrieve the user-cursus associations concerned.

## Returns

`Promise`\<[`User`](../../../models/User/classes/User.md)[]\>

Returns a list of user.

## Throws

If an unexpected error occurs during users retrieval.
