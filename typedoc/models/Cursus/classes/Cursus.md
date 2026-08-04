[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Cursus](../README.md) / Cursus

# Class: Cursus

Defined in: [src/models/Cursus.ts:38](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L38)

## Extends

- `Model`\<`CursusAttributes`, `CursusCreationAttributes`\>

## Implements

- `CursusAttributes`

## Constructors

### Constructor

> **new Cursus**(`values?`, `options?`): `Cursus`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`CursusCreationAttributes`, `NullishPropertiesOf`\<`CursusCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Cursus`

#### Inherited from

`Model<CursusAttributes, CursusCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Cursus.ts:48](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L48)

#### Implementation of

`CursusAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Cursus.ts:50](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L50)

#### Implementation of

`CursusAttributes.createdBy`

***

### CursusPurchases

> **CursusPurchases**: [`UserCursus`](../../User-Cursus/classes/UserCursus.md)[]

Defined in: [src/models/Cursus.ts:56](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L56)

#### Implementation of

`CursusAttributes.CursusPurchases`

***

### id

> **id**: `number`

Defined in: [src/models/Cursus.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L42)

#### Implementation of

`CursusAttributes.id`

***

### IncludedInTheme

> **IncludedInTheme**: [`Theme`](../../Theme/classes/Theme.md)

Defined in: [src/models/Cursus.ts:53](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L53)

#### Implementation of

`CursusAttributes.IncludedInTheme`

***

### IncludesLessons

> **IncludesLessons**: [`Lesson`](../../Lesson/classes/Lesson.md)[]

Defined in: [src/models/Cursus.ts:55](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L55)

#### Implementation of

`CursusAttributes.IncludesLessons`

***

### name

> **name**: `string`

Defined in: [src/models/Cursus.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L44)

#### Implementation of

`CursusAttributes.name`

***

### order

> **order**: `number`

Defined in: [src/models/Cursus.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L46)

#### Implementation of

`CursusAttributes.order`

***

### price

> **price**: `number`

Defined in: [src/models/Cursus.ts:45](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L45)

#### Implementation of

`CursusAttributes.price`

***

### theme\_id

> **theme\_id**: `number`

Defined in: [src/models/Cursus.ts:43](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L43)

#### Implementation of

`CursusAttributes.theme_id`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Cursus.ts:49](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L49)

#### Implementation of

`CursusAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Cursus.ts:51](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L51)

#### Implementation of

`CursusAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md) \| `null`

Defined in: [src/models/Cursus.ts:54](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Cursus.ts#L54)

#### Implementation of

`CursusAttributes.UpdatedByUser`
