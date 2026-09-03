[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [utils/AppError](../README.md) / AppError

# Class: AppError

Defined in: [src/utils/AppError.ts:3](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/utils/AppError.ts#L3)

## Extends

- `Error`

## Constructors

### Constructor

> **new AppError**(`status`, `message`, `messageFront`, `options?`): `AppError`

Defined in: [src/utils/AppError.ts:8](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/utils/AppError.ts#L8)

#### Parameters

##### status

`number`

##### message

`string`

##### messageFront

`string`

##### options?

###### cause?

`Error`

###### dbErrorContext?

\{ `errorCode`: `string`; `model`: [`ModelList`](../../../types/types/type-aliases/ModelList.md); `operation`: `string`; \}

###### dbErrorContext.errorCode

`string`

###### dbErrorContext.model

[`ModelList`](../../../types/types/type-aliases/ModelList.md)

###### dbErrorContext.operation

`string`

#### Returns

`AppError`

#### Overrides

`Error.constructor`

## Properties

### dbErrorContext?

> `optional` **dbErrorContext**: `object`

Defined in: [src/utils/AppError.ts:6](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/utils/AppError.ts#L6)

#### errorCode

> **errorCode**: `string`

#### model

> **model**: [`ModelList`](../../../types/types/type-aliases/ModelList.md)

#### operation

> **operation**: `string`

***

### messageFront

> **messageFront**: `string`

Defined in: [src/utils/AppError.ts:5](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/utils/AppError.ts#L5)

***

### status

> **status**: `number`

Defined in: [src/utils/AppError.ts:4](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/utils/AppError.ts#L4)
