[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / getLessonsInCursus

# Function: getLessonsInCursus()

> **getLessonsInCursus**(`cursusId`): `Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>

Defined in: [src/services/lesson.service.ts:60](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/services/lesson.service.ts#L60)

**`Function`**

Get all lessons included in a specific cursus.

## Parameters

### cursusId

`number`

The ID of the cursus containing the lessons that have to be retrieved.

## Returns

`Promise`\<[`LessonData`](../../../types/Interfaces/interfaces/LessonData.md)[]\>

A list of objects containing informations of all lessons included in specified cursus.

## Async

getLessonsInCursus

## Throws

If an unexpected error occurs during lessons retrieval.
