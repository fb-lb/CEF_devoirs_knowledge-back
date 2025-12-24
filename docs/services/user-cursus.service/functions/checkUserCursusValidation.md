[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / checkUserCursusValidation

# Function: checkUserCursusValidation()

> **checkUserCursusValidation**(`cursusId`, `userId`, `requestorId`): `Promise`\<`void`\>

Defined in: [src/services/user-cursus.service.ts:182](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-cursus.service.ts#L182)

**`Function`**

Updates user-cursus validation. First, it checks if a user has access to all lessons in the cursus concerned.
If not user-cursus validation is updated false but if true, it checks if all user-lessons related to this cursus are validated.
If not user-cursus validation is updated false but if true, user-cursus validation is updated true.

## Parameters

### cursusId

`number`

The ID of the cursus related to user-cursus association to check.

### userId

`number`

The ID of the user related to user-cursus association to check.

### requestorId

`number`

The ID of the user performing this update.

## Returns

`Promise`\<`void`\>

## Async

checkUserCursusValidation

## Throws

If user-cursus assocation is not retrieved width cursus ID and user ID provided.

## Throws

If an unexpected error occurs during the checking.
