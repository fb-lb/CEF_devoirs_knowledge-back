[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-lesson.service](../README.md) / getUsersWhoHaveUserLessonForThisCursus

# Function: getUsersWhoHaveUserLessonForThisCursus()

> **getUsersWhoHaveUserLessonForThisCursus**(`cursusId`): `Promise`\<[`User`](../../../models/User/classes/User.md)[]\>

Defined in: [src/services/user-lesson.service.ts:371](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/user-lesson.service.ts#L371)

Retrieves the users who have a user-lesson association related to a specific cursus.

## Parameters

### cursusId

`number`

The ID of the cursus used to retrieve the user-lesson associations concerned.

## Returns

`Promise`\<[`User`](../../../models/User/classes/User.md)[]\>

Returns a list of user.

## Throws

If an unexpected error occurs during users retrieval.
