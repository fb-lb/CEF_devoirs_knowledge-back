[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / getUsersCursusForThisUser

# Function: getUsersCursusForThisUser()

> **getUsersCursusForThisUser**(`requestorId`): `Promise`\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>

Defined in: [src/services/user-cursus.service.ts:102](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-cursus.service.ts#L102)

**`Function`**

Retrieves all user-cursus associations for a specific user in the database.

## Parameters

### requestorId

`number`

The user ID used to retrieve the user-cursus associations.

## Returns

`Promise`\<[`UserCursusData`](../../../types/Interfaces/interfaces/UserCursusData.md)[]\>

Returns a list of objects containing the user-cursus associations retrieved for the specified user.

## Async

getUsersCursusForThisUser

## Throws

If an unexpected error occurs during user-cursus associations retrieval.
