[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/form.service](../README.md) / validateAddLessonForm

# Function: validateAddLessonForm()

> **validateAddLessonForm**(`lessonName`, `cursusId`, `price`): `void`

Defined in: [src/services/form.service.ts:312](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/form.service.ts#L312)

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
