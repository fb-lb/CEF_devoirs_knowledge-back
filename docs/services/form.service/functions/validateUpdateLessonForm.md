[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateUpdateLessonForm

# Function: validateUpdateLessonForm()

> **validateUpdateLessonForm**(`newLessonName`, `newLessonPrice`): `void`

Defined in: [src/services/form.service.ts:662](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/form.service.ts#L662)

**`Function`**

Checks validity of the update lesson form.

 validateUpdateLessonForm

## Parameters

### newLessonName

`string`

The new name of the lesson.

### newLessonPrice

`number`

The new price of the lesson.

## Returns

`void`

## Throws

If new lesson name or new lesson price is null.

## Throws

If lesson name length > 255.

## Throws

If lesson name contains a caracter not allowed.

## Throws

If lesson price value < 0.
