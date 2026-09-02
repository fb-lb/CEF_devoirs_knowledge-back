[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Text](../README.md) / Text

# Class: Text

Defined in: [src/models/Text.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L25)

## Extends

- `Model`\<`TextAttributes`, `TextCreationAttributes`\>

## Implements

- `TextAttributes`

## Constructors

### Constructor

> **new Text**(`values?`, `options?`): `Text`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`TextCreationAttributes`, `NullishPropertiesOf`\<`TextCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`Text`

#### Inherited from

`Model<TextAttributes, TextCreationAttributes>.constructor`

## Properties

### content

> **content**: `string`

Defined in: [src/models/Text.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L29)

#### Implementation of

`TextAttributes.content`

***

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Text.ts:31](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L31)

#### Implementation of

`TextAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Text.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L33)

#### Implementation of

`TextAttributes.createdBy`

***

### element\_id

> **element\_id**: `number`

Defined in: [src/models/Text.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L27)

#### Implementation of

`TextAttributes.element_id`

***

### id

> **id**: `number`

Defined in: [src/models/Text.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L26)

#### Implementation of

`TextAttributes.id`

***

### IncludedInElement

> **IncludedInElement**: [`Element`](../../Element/classes/Element.md)

Defined in: [src/models/Text.ts:36](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L36)

#### Implementation of

`TextAttributes.IncludedInElement`

***

### type

> **type**: `"title1"` \| `"title2"` \| `"title3"` \| `"paragraph"`

Defined in: [src/models/Text.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L28)

#### Implementation of

`TextAttributes.type`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Text.ts:32](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L32)

#### Implementation of

`TextAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Text.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L34)

#### Implementation of

`TextAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/Text.ts:37](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/models/Text.ts#L37)

#### Implementation of

`TextAttributes.UpdatedByUser`
