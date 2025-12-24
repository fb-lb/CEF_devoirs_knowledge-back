[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / addLesson

# Function: addLesson()

> **addLesson**(`lessonName`, `price`, `lessonsInSameCursus`, `requestorId`, `cursusId`): `Promise`\<`number`\>

Defined in: [src/services/lesson.service.ts:218](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/lesson.service.ts#L218)

**`Function`**

Creates a new lesson after verifying that the name is unique between lessons in the same cursus.

## Parameters

### lessonName

`string`

The name of the lesson to add.

### price

`number`

Price of the new lesson.

### lessonsInSameCursus

[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]

The list of existing lessons (in the same cursus) used to ensure name uniqueness.

### requestorId

`number`

The ID of the user who creates the lesson.

### cursusId

`number`

The ID of the cursus containing the new lesson.

## Returns

`Promise`\<`number`\>

The ID of the created lesson.

## Async

addLesson

## Throws

If a lesson with the same name already exists.

## Throws

If an unexpected error occurs during lesson creation.
