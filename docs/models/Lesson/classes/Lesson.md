[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Lesson](../README.md) / Lesson

# Class: Lesson

Defined in: [src/models/Lesson.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L27)

## Extends

- `Model`\<`LessonAttributes`, `LessonCreationAttributes`\>

## Implements

- `LessonAttributes`

## Constructors

### Constructor

> **new Lesson**(`values?`, `options?`): `Lesson`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`LessonCreationAttributes`, `NullishPropertiesOf`\<`LessonCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Lesson`

#### Inherited from

`Model<LessonAttributes, LessonCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Lesson.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L34)

#### Implementation of

`LessonAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Lesson.ts:36](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L36)

#### Implementation of

`LessonAttributes.createdBy`

***

### cursus\_id

> **cursus\_id**: `number`

Defined in: [src/models/Lesson.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L29)

#### Implementation of

`LessonAttributes.cursus_id`

***

### id

> **id**: `number`

Defined in: [src/models/Lesson.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L28)

#### Implementation of

`LessonAttributes.id`

***

### IncludedInCursus

> **IncludedInCursus**: [`Cursus`](../../Cursus/classes/Cursus.md)

Defined in: [src/models/Lesson.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L39)

#### Implementation of

`LessonAttributes.IncludedInCursus`

***

### IncludesElements

> **IncludesElements**: [`Element`](../../Element/classes/Element.md)[]

Defined in: [src/models/Lesson.ts:41](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L41)

#### Implementation of

`LessonAttributes.IncludesElements`

***

### LessonPurchases

> **LessonPurchases**: [`UserLesson`](../../User-Lesson/classes/UserLesson.md)[]

Defined in: [src/models/Lesson.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L42)

#### Implementation of

`LessonAttributes.LessonPurchases`

***

### name

> **name**: `string`

Defined in: [src/models/Lesson.ts:30](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L30)

#### Implementation of

`LessonAttributes.name`

***

### order

> **order**: `number`

Defined in: [src/models/Lesson.ts:32](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L32)

#### Implementation of

`LessonAttributes.order`

***

### price

> **price**: `number`

Defined in: [src/models/Lesson.ts:31](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L31)

#### Implementation of

`LessonAttributes.price`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Lesson.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L35)

#### Implementation of

`LessonAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Lesson.ts:37](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L37)

#### Implementation of

`LessonAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md) \| `null`

Defined in: [src/models/Lesson.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Lesson.ts#L40)

#### Implementation of

`LessonAttributes.UpdatedByUser`
