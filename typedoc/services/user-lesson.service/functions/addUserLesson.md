[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / addUserLesson

# Function: addUserLesson()

> **addUserLesson**(`userId`, `lessonId`, `requestorId`): `Promise`\<`number` \| `null`\>

Defined in: [src/services/user-lesson.service.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-lesson.service.ts#L28)

**`Function`**

Adds a user-lesson association into the database.

## Parameters

### userId

`number`

The ID of the user related to the lesson.

### lessonId

`number`

The ID of the lesson related to the user.

### requestorId

`number`

The ID of the user performing the creation.

## Returns

`Promise`\<`number` \| `null`\>

Returns the ID of the cursus containing the lesson if user-lesson creation is a success.
Returns null if this user-lesson association already exists in the database.

## Async

addUserLesson

## Throws

If an unexpected error occurs during user-lesson creation.
