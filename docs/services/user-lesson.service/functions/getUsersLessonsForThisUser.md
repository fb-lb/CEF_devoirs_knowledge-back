[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / getUsersLessonsForThisUser

# Function: getUsersLessonsForThisUser()

> **getUsersLessonsForThisUser**(`requestorId`): `Promise`\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>

Defined in: [src/services/user-lesson.service.ts:103](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-lesson.service.ts#L103)

**`Function`**

Retrieves all user-lesson associations for a specific user in the database.

## Parameters

### requestorId

`number`

The user ID used to retrieve the user-lesson associations.

## Returns

`Promise`\<[`UserLessonData`](../../../types/Interfaces/interfaces/UserLessonData.md)[]\>

Returns a list of objects containing the user-lesson associations retrieved for the specified user.

## Async

getUsersLessonsForThisUser

## Throws

If an unexpected error occurs during user-lesson associations retrieval.
