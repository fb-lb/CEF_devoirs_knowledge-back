[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [models/User](../README.md) / User

# Class: User

Defined in: [src/models/User.ts:72](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L72)

## Extends

- `Model`\<`UserAttributes`, `UserCreationAttributes`\>

## Implements

- `UserAttributes`

## Constructors

### Constructor

> **new User**(`values?`, `options?`): `User`

Defined in: node\_modules/sequelize/types/model.d.ts:3083

Builds a new model instance.

#### Parameters

##### values?

`Optional`\<`UserCreationAttributes`, `NullishPropertiesOf`\<`UserCreationAttributes`\>\>

an object of key value pairs

##### options?

`BuildOptions`

#### Returns

`User`

#### Inherited from

`Model<UserAttributes, UserCreationAttributes>.constructor`

## Properties

### createdAt

> `readonly` **createdAt**: `Date`

Defined in: [src/models/User.ts:84](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L84)

#### Implementation of

`UserAttributes.createdAt`

***

### CreatedUsersCursus

> **CreatedUsersCursus**: [`UserCursus`](../../User-Cursus/classes/UserCursus.md)[]

Defined in: [src/models/User.ts:100](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L100)

#### Implementation of

`UserAttributes.CreatedUsersCursus`

***

### CreatedUsersLessons

> **CreatedUsersLessons**: [`UserLesson`](../../User-Lesson/classes/UserLesson.md)[]

Defined in: [src/models/User.ts:103](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L103)

#### Implementation of

`UserAttributes.CreatedUsersLessons`

***

### CreatedUsersThemes

> **CreatedUsersThemes**: [`UserTheme`](../../User-Theme/classes/UserTheme.md)[]

Defined in: [src/models/User.ts:97](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L97)

#### Implementation of

`UserAttributes.CreatedUsersThemes`

***

### email

> **email**: `string`

Defined in: [src/models/User.ts:79](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L79)

#### Implementation of

`UserAttributes.email`

***

### firstName

> **firstName**: `string`

Defined in: [src/models/User.ts:77](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L77)

#### Implementation of

`UserAttributes.firstName`

***

### HasUserCursus

> **HasUserCursus**: [`UserCursus`](../../User-Cursus/classes/UserCursus.md)[]

Defined in: [src/models/User.ts:99](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L99)

#### Implementation of

`UserAttributes.HasUserCursus`

***

### HasUserLessons

> **HasUserLessons**: [`UserLesson`](../../User-Lesson/classes/UserLesson.md)[]

Defined in: [src/models/User.ts:102](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L102)

#### Implementation of

`UserAttributes.HasUserLessons`

***

### HasUserThemes

> **HasUserThemes**: [`UserTheme`](../../User-Theme/classes/UserTheme.md)[]

Defined in: [src/models/User.ts:96](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L96)

#### Implementation of

`UserAttributes.HasUserThemes`

***

### id

> **id**: `number`

Defined in: [src/models/User.ts:76](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L76)

#### Implementation of

`UserAttributes.id`

***

### isVerified

> **isVerified**: `boolean`

Defined in: [src/models/User.ts:82](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L82)

#### Implementation of

`UserAttributes.isVerified`

***

### lastName

> **lastName**: `string`

Defined in: [src/models/User.ts:78](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L78)

#### Implementation of

`UserAttributes.lastName`

***

### password

> **password**: `string`

Defined in: [src/models/User.ts:80](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L80)

#### Implementation of

`UserAttributes.password`

***

### roles

> **roles**: (`"user"` \| `"admin"`)[]

Defined in: [src/models/User.ts:81](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L81)

#### Implementation of

`UserAttributes.roles`

***

### updatedAt

> `readonly` **updatedAt**: `Date`

Defined in: [src/models/User.ts:85](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L85)

#### Implementation of

`UserAttributes.updatedAt`

***

### updatedBy

> **updatedBy**: `number` \| `null`

Defined in: [src/models/User.ts:86](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L86)

#### Implementation of

`UserAttributes.updatedBy`

***

### UpdatedByUsers

> **UpdatedByUsers**: `User` \| `null`

Defined in: [src/models/User.ts:88](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L88)

#### Implementation of

`UserAttributes.UpdatedByUsers`

***

### UpdatedCursus

> **UpdatedCursus**: [`Cursus`](../../Cursus/classes/Cursus.md)[]

Defined in: [src/models/User.ts:91](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L91)

#### Implementation of

`UserAttributes.UpdatedCursus`

***

### UpdatedElements

> **UpdatedElements**: [`Element`](../../Element/classes/Element.md)[]

Defined in: [src/models/User.ts:93](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L93)

#### Implementation of

`UserAttributes.UpdatedElements`

***

### UpdatedImages

> **UpdatedImages**: [`Image`](../../Image/classes/Image.md)[]

Defined in: [src/models/User.ts:95](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L95)

#### Implementation of

`UserAttributes.UpdatedImages`

***

### UpdatedLessons

> **UpdatedLessons**: [`Lesson`](../../Lesson/classes/Lesson.md)[]

Defined in: [src/models/User.ts:92](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L92)

#### Implementation of

`UserAttributes.UpdatedLessons`

***

### UpdatedText

> **UpdatedText**: [`Text`](../../Text/classes/Text.md)[]

Defined in: [src/models/User.ts:94](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L94)

#### Implementation of

`UserAttributes.UpdatedText`

***

### UpdatedThemes

> **UpdatedThemes**: [`Theme`](../../Theme/classes/Theme.md)[]

Defined in: [src/models/User.ts:90](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L90)

#### Implementation of

`UserAttributes.UpdatedThemes`

***

### UpdatedUsers

> **UpdatedUsers**: `User`[]

Defined in: [src/models/User.ts:89](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L89)

#### Implementation of

`UserAttributes.UpdatedUsers`

***

### UpdatedUsersCursus

> **UpdatedUsersCursus**: [`UserCursus`](../../User-Cursus/classes/UserCursus.md)[]

Defined in: [src/models/User.ts:101](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L101)

#### Implementation of

`UserAttributes.UpdatedUsersCursus`

***

### UpdatedUsersLessons

> **UpdatedUsersLessons**: [`UserLesson`](../../User-Lesson/classes/UserLesson.md)[]

Defined in: [src/models/User.ts:104](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L104)

#### Implementation of

`UserAttributes.UpdatedUsersLessons`

***

### UpdatedUsersThemes

> **UpdatedUsersThemes**: [`UserTheme`](../../User-Theme/classes/UserTheme.md)[]

Defined in: [src/models/User.ts:98](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/models/User.ts#L98)

#### Implementation of

`UserAttributes.UpdatedUsersThemes`
