[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/lesson.service](../README.md) / getCursusIdAndThemeIdForThisLesson

# Function: getCursusIdAndThemeIdForThisLesson()

> **getCursusIdAndThemeIdForThisLesson**(`lessonId`): `Promise`\<\{ `cursusId`: `number`; `themeId`: `number`; \}\>

Defined in: [src/services/lesson.service.ts:347](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/lesson.service.ts#L347)

**`Function`**

Retrieves the theme/cursus ID of the theme/cursus containing a specific cursus.

## Parameters

### lessonId

`number`

The ID of the lesson used to know which theme/cursus ID is wanted.

## Returns

`Promise`\<\{ `cursusId`: `number`; `themeId`: `number`; \}\>

The ID of the theme/cursus containing the cursus.

## Async

getCursusIdAndThemeIdForThisLesson

## Throws

If lesson is not found with the provided ID.

## Throws

If an unexpected error occurs during theme/cursus ID retrieval.
