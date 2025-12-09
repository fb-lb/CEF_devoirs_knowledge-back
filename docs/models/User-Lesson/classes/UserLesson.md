[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/User-Lesson](../README.md) / UserLesson

# Class: UserLesson

Defined in: [src/models/User-Lesson.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L35)

## Extends

- `Model`\<`UserLessonAttributes`, `UserLessonCreationAttributes`\>

## Implements

- `UserLessonAttributes`

## Constructors

### Constructor

> **new UserLesson**(`values?`, `options?`): `UserLesson`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`UserLessonCreationAttributes`, `NullishPropertiesOf`\<`UserLessonCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`UserLesson`

#### Inherited from

`Model<UserLessonAttributes, UserLessonCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/User-Lesson.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L44)

#### Implementation of

`UserLessonAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/User-Lesson.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L46)

#### Implementation of

`UserLessonAttributes.createdBy`

***

### CreatedByUser

> **CreatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Lesson.ts:50](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L50)

#### Implementation of

`UserLessonAttributes.CreatedByUser`

***

### id

> **id**: `number`

Defined in: [src/models/User-Lesson.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L39)

#### Implementation of

`UserLessonAttributes.id`

***

### isValidated

> **isValidated**: `boolean`

Defined in: [src/models/User-Lesson.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L42)

#### Implementation of

`UserLessonAttributes.isValidated`

***

### lesson\_id

> **lesson\_id**: `number`

Defined in: [src/models/User-Lesson.ts:41](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L41)

#### Implementation of

`UserLessonAttributes.lesson_id`

***

### PurchasedByUser

> **PurchasedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Lesson.ts:49](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L49)

#### Implementation of

`UserLessonAttributes.PurchasedByUser`

***

### RelatedToLesson

> **RelatedToLesson**: [`Lesson`](../../Lesson/classes/Lesson.md)

Defined in: [src/models/User-Lesson.ts:52](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L52)

#### Implementation of

`UserLessonAttributes.RelatedToLesson`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/User-Lesson.ts:45](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L45)

#### Implementation of

`UserLessonAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/User-Lesson.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L47)

#### Implementation of

`UserLessonAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Lesson.ts:51](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L51)

#### Implementation of

`UserLessonAttributes.UpdatedByUser`

***

### user\_id

> **user\_id**: `number`

Defined in: [src/models/User-Lesson.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/User-Lesson.ts#L40)

#### Implementation of

`UserLessonAttributes.user_id`
