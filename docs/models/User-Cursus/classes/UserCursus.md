[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/User-Cursus](../README.md) / UserCursus

# Class: UserCursus

Defined in: [src/models/User-Cursus.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L35)

## Extends

- `Model`\<`UserCursusAttributes`, `UserCursusCreationAttributes`\>

## Implements

- `UserCursusAttributes`

## Constructors

### Constructor

> **new UserCursus**(`values?`, `options?`): `UserCursus`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`UserCursusCreationAttributes`, `NullishPropertiesOf`\<`UserCursusCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`UserCursus`

#### Inherited from

`Model<UserCursusAttributes, UserCursusCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/User-Cursus.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L44)

#### Implementation of

`UserCursusAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/User-Cursus.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L46)

#### Implementation of

`UserCursusAttributes.createdBy`

***

### CreatedByUser

> **CreatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Cursus.ts:50](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L50)

#### Implementation of

`UserCursusAttributes.CreatedByUser`

***

### cursus\_id

> **cursus\_id**: `number`

Defined in: [src/models/User-Cursus.ts:41](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L41)

#### Implementation of

`UserCursusAttributes.cursus_id`

***

### id

> **id**: `number`

Defined in: [src/models/User-Cursus.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L39)

#### Implementation of

`UserCursusAttributes.id`

***

### isValidated

> **isValidated**: `boolean`

Defined in: [src/models/User-Cursus.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L42)

#### Implementation of

`UserCursusAttributes.isValidated`

***

### PurchasedByUser

> **PurchasedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Cursus.ts:49](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L49)

#### Implementation of

`UserCursusAttributes.PurchasedByUser`

***

### RelatedToCursus

> **RelatedToCursus**: [`Cursus`](../../Cursus/classes/Cursus.md)

Defined in: [src/models/User-Cursus.ts:52](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L52)

#### Implementation of

`UserCursusAttributes.RelatedToCursus`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/User-Cursus.ts:45](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L45)

#### Implementation of

`UserCursusAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/User-Cursus.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L47)

#### Implementation of

`UserCursusAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/User-Cursus.ts:51](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L51)

#### Implementation of

`UserCursusAttributes.UpdatedByUser`

***

### user\_id

> **user\_id**: `number`

Defined in: [src/models/User-Cursus.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/User-Cursus.ts#L40)

#### Implementation of

`UserCursusAttributes.user_id`
