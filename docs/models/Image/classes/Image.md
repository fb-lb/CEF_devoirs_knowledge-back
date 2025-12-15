[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Image](../README.md) / Image

# Class: Image

Defined in: [src/models/Image.ts:23](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L23)

## Extends

- `Model`\<`ImageAttributes`, `ImageCreationAttributes`\>

## Implements

- `ImageAttributes`

## Constructors

### Constructor

> **new Image**(`values?`, `options?`): `Image`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`ImageCreationAttributes`, `NullishPropertiesOf`\<`ImageCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Image`

#### Inherited from

`Model<ImageAttributes, ImageCreationAttributes>.constructor`

## Properties

### alternative

> **alternative**: `string`

Defined in: [src/models/Image.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L28)

#### Implementation of

`ImageAttributes.alternative`

***

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Image.ts:30](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L30)

#### Implementation of

`ImageAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Image.ts:32](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L32)

#### Implementation of

`ImageAttributes.createdBy`

***

### element\_id

> **element\_id**: `number`

Defined in: [src/models/Image.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L25)

#### Implementation of

`ImageAttributes.element_id`

***

### id

> **id**: `number`

Defined in: [src/models/Image.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L24)

#### Implementation of

`ImageAttributes.id`

***

### IncludedInElement

> **IncludedInElement**: [`Element`](../../Element/classes/Element.md)

Defined in: [src/models/Image.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L35)

#### Implementation of

`ImageAttributes.IncludedInElement`

***

### legend

> **legend**: `string` \| `null`

Defined in: [src/models/Image.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L26)

#### Implementation of

`ImageAttributes.legend`

***

### source

> **source**: `string`

Defined in: [src/models/Image.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L27)

#### Implementation of

`ImageAttributes.source`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Image.ts:31](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L31)

#### Implementation of

`ImageAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Image.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L33)

#### Implementation of

`ImageAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md) \| `null`

Defined in: [src/models/Image.ts:36](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/models/Image.ts#L36)

#### Implementation of

`ImageAttributes.UpdatedByUser`
