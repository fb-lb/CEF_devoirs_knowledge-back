[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Theme](../README.md) / Theme

# Class: Theme

Defined in: [src/models/Theme.ts:23](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L23)

## Extends

- `Model`\<`ThemeAttributes`, `ThemeCreationAttributes`\>

## Implements

- `ThemeAttributes`

## Constructors

### Constructor

> **new Theme**(`values?`, `options?`): `Theme`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`ThemeCreationAttributes`, `NullishPropertiesOf`\<`ThemeCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Theme`

#### Inherited from

`Model<ThemeAttributes, ThemeCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Theme.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L28)

#### Implementation of

`ThemeAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Theme.ts:30](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L30)

#### Implementation of

`ThemeAttributes.createdBy`

***

### id

> **id**: `number`

Defined in: [src/models/Theme.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L24)

#### Implementation of

`ThemeAttributes.id`

***

### IncludesCursus

> **IncludesCursus**: [`Cursus`](../../Cursus/classes/Cursus.md)[]

Defined in: [src/models/Theme.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L34)

#### Implementation of

`ThemeAttributes.IncludesCursus`

***

### name

> **name**: `string`

Defined in: [src/models/Theme.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L25)

#### Implementation of

`ThemeAttributes.name`

***

### order

> **order**: `number`

Defined in: [src/models/Theme.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L26)

#### Implementation of

`ThemeAttributes.order`

***

### ThemePurchases

> **ThemePurchases**: [`UserTheme`](../../User-Theme/classes/UserTheme.md)[]

Defined in: [src/models/Theme.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L35)

#### Implementation of

`ThemeAttributes.ThemePurchases`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Theme.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L29)

#### Implementation of

`ThemeAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Theme.ts:31](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L31)

#### Implementation of

`ThemeAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md) \| `null`

Defined in: [src/models/Theme.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/models/Theme.ts#L33)

#### Implementation of

`ThemeAttributes.UpdatedByUser`
