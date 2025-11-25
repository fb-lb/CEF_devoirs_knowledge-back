[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / getAllCursusAvailable

# Function: getAllCursusAvailable()

> **getAllCursusAvailable**(`userId`): `Promise`\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>

Defined in: [src/services/user-cursus.service.ts:144](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user-cursus.service.ts#L144)

**`Function`**

Retrieves all cursus available for a specific user in the database.

## Parameters

### userId

`number`

The user ID used to retrieve the cursus.

## Returns

`Promise`\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)[]\>

Returns a list of cursus retrieved for the specified user.

## Async

getAllCursusAvailable

## Throws

If an unexpected error occurs during cursus retrieval.
