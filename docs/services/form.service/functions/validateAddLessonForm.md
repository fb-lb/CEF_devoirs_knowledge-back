[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddLessonForm

# Function: validateAddLessonForm()

> **validateAddLessonForm**(`lessonName`, `cursusId`, `price`): `void`

Defined in: [src/services/form.service.ts:422](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/form.service.ts#L422)

**`Function`**

Checks validity of the add lesson form fields.

 validateAddLessonForm

## Parameters

### lessonName

`string`

The lesson name.

### cursusId

`number`

The ID of the cursus containing the lesson.

### price

`number`

The price of the lesson.

## Returns

`void`

## Throws

If lesson name or price is null.

## Throws

If cursus id is null.

## Throws

If lesson name length > 255.

## Throws

If lesson name contains unauthorized caracters.

## Throws

If price value < 0.
