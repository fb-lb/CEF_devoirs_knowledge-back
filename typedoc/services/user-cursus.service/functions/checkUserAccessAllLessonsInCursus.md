[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user-cursus.service](../README.md) / checkUserAccessAllLessonsInCursus

# Function: checkUserAccessAllLessonsInCursus()

> **checkUserAccessAllLessonsInCursus**(`userCursusId`): `Promise`\<`boolean`\>

Defined in: [src/services/user-cursus.service.ts:247](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user-cursus.service.ts#L247)

**`Function`**

Checks if a user has access to all lessons in a cursus.

## Parameters

### userCursusId

`number`

The user-cursus association ID used to retrieve the cursus to check.

## Returns

`Promise`\<`boolean`\>

Returns `true` if the user of the user-cursus association has access to all lessons in th cursus related
to the user-cursus association. Otherwise, it returns `false`.

## Async

checkUserAccessAllLessonsInCursus

## Throws

If user-cursus association is not retrieved width cursus ID and user ID provided.

## Throws

If an unexpected error occurs during the checking.
