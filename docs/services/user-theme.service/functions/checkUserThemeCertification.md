[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-theme.service](../README.md) / checkUserThemeCertification

# Function: checkUserThemeCertification()

> **checkUserThemeCertification**(`themeId`, `userId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-theme.service.ts:175](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/services/user-theme.service.ts#L175)

**`Function`**

Updates user-theme certification. First, it checks if a user has access to all cursus in the theme concerned.
If not user-theme certification is updated false but if true, it checks if all user-cursus related to this theme are validated.
If not user-theme certification is updated false but if true, user-theme certification is updated true.

## Parameters

### themeId

`number`

The ID of the theme related to user-theme association to check.

### userId

`number`

The ID of the user related to user-theme association to check.

### requestorId

`number`

The ID of the user performing this update.

## Returns

`Promise`\<`void`\>

## Async

checkUserThemeCertification

## Throws

If user-theme assocation is not retrieved width theme ID and user ID provided.

## Throws

If an unexpected error occurs during the checking.
