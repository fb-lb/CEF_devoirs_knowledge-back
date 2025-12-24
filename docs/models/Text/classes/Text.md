[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/Text](../README.md) / Text

# Class: Text

Defined in: [src/models/Text.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L22)

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

Defined in: [src/models/Text.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L26)

#### Implementation of

`TextAttributes.content`

***

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/Text.ts:28](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L28)

#### Implementation of

`TextAttributes.createdAt`

***

### createdBy

> **createdBy**: `number` \| `null`

Defined in: [src/models/Text.ts:30](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L30)

#### Implementation of

`TextAttributes.createdBy`

***

### element\_id

> **element\_id**: `number`

Defined in: [src/models/Text.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L24)

#### Implementation of

`TextAttributes.element_id`

***

### id

> **id**: `number`

Defined in: [src/models/Text.ts:23](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L23)

#### Implementation of

`TextAttributes.id`

***

### IncludedInElement

> **IncludedInElement**: [`Element`](../../Element/classes/Element.md)

Defined in: [src/models/Text.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L33)

#### Implementation of

`TextAttributes.IncludedInElement`

***

### type

> **type**: `"title1"` \| `"title2"` \| `"title3"` \| `"paragraph"`

Defined in: [src/models/Text.ts:25](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L25)

#### Implementation of

`TextAttributes.type`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/Text.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L29)

#### Implementation of

`TextAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/Text.ts:31](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L31)

#### Implementation of

`TextAttributes.updatedBy`

***

### UpdatedByUser

> **UpdatedByUser**: [`User`](../../User/classes/User.md)

Defined in: [src/models/Text.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/models/Text.ts#L34)

#### Implementation of

`TextAttributes.UpdatedByUser`
