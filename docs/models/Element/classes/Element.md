[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Element](../README.md) / Element

# Class: Element

Defined in: [src/models/Element.ts:37](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L37)

## Extends

- `Model`\<`ElementAttributes`, `ElementCreationAttributes`\>

## Implements

- `ElementAttributes`

## Constructors

### Constructor

> **new Element**(`values?`, `options?`): `Element`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`ElementCreationAttributes`, `NullishPropertiesOf`\<`ElementCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Element`

#### Inherited from

`Model<ElementAttributes, ElementCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Element.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L46)

#### Implementation of

`ElementAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Element.ts:48](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L48)

#### Implementation of

`ElementAttributes.createdBy`

***

### id

> **id**: `number`

Defined in: [src/models/Element.ts:41](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L41)

#### Implementation of

`ElementAttributes.id`

***

### IncludedInLesson

> **IncludedInLesson**: [`Lesson`](../../Lesson/classes/Lesson.md)

Defined in: [src/models/Element.ts:51](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L51)

#### Implementation of

`ElementAttributes.IncludedInLesson`

***

### IncludeImage

> **IncludeImage**: [`Image`](../../Image/classes/Image.md)

Defined in: [src/models/Element.ts:54](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L54)

#### Implementation of

`ElementAttributes.IncludeImage`

***

### IncludeText

> **IncludeText**: [`Text`](../../Text/classes/Text.md)

Defined in: [src/models/Element.ts:53](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L53)

#### Implementation of

`ElementAttributes.IncludeText`

***

### lesson\_id

> **lesson\_id**: `number`

Defined in: [src/models/Element.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L42)

#### Implementation of

`ElementAttributes.lesson_id`

***

### order

> **order**: `number`

Defined in: [src/models/Element.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L44)

#### Implementation of

`ElementAttributes.order`

***

### type

> **type**: `"text"` \| `"image"`

Defined in: [src/models/Element.ts:43](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L43)

#### Implementation of

`ElementAttributes.type`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Element.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L47)

#### Implementation of

`ElementAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Element.ts:49](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L49)

#### Implementation of

`ElementAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md) \| `null`

Defined in: [src/models/Element.ts:52](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/models/Element.ts#L52)

#### Implementation of

`ElementAttributes.UpdatedByUser`
