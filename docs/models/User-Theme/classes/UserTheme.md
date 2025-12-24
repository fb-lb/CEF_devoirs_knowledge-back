[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/User-Theme](../README.md) / UserTheme

# Class: UserTheme

Defined in: [src/models/User-Theme.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L35)

## Extends

- `Model`\<`UserThemeAttributes`, `UserThemeCreationAttributes`\>

## Implements

- `UserThemeAttributes`

## Constructors

### Constructor

> **new UserTheme**(`values?`, `options?`): `UserTheme`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`UserThemeCreationAttributes`, `NullishPropertiesOf`\<`UserThemeCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`UserTheme`

#### Inherited from

`Model<UserThemeAttributes, UserThemeCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/User-Theme.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L44)

#### Implementation of

`UserThemeAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/User-Theme.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L46)

#### Implementation of

`UserThemeAttributes.createdBy`

***

### CreatedByUser

> **CreatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Theme.ts:50](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L50)

#### Implementation of

`UserThemeAttributes.CreatedByUser`

***

### id

> **id**: `number`

Defined in: [src/models/User-Theme.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L39)

#### Implementation of

`UserThemeAttributes.id`

***

### isCertified

> **isCertified**: `boolean`

Defined in: [src/models/User-Theme.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L42)

#### Implementation of

`UserThemeAttributes.isCertified`

***

### PurchasedByUser

> **PurchasedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Theme.ts:49](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L49)

#### Implementation of

`UserThemeAttributes.PurchasedByUser`

***

### RelatedToTheme

> **RelatedToTheme**: [`Theme`](../../Theme/classes/Theme.md)

Defined in: [src/models/User-Theme.ts:52](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L52)

#### Implementation of

`UserThemeAttributes.RelatedToTheme`

***

### theme\_id

> **theme\_id**: `number`

Defined in: [src/models/User-Theme.ts:41](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L41)

#### Implementation of

`UserThemeAttributes.theme_id`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/User-Theme.ts:45](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L45)

#### Implementation of

`UserThemeAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/User-Theme.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L47)

#### Implementation of

`UserThemeAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Theme.ts:51](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L51)

#### Implementation of

`UserThemeAttributes.UpdatedByUser`

***

### user\_id

> **user\_id**: `number`

Defined in: [src/models/User-Theme.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/User-Theme.ts#L40)

#### Implementation of

`UserThemeAttributes.user_id`
