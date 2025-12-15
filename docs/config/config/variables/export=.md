[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [config/config](../README.md) / export=

# Variable: export=

> **export=**: `object`

Defined in: [src/config/config.cjs:1](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/92bce3fddfb9a7cbf0a922fbf3e1fb365cc1842a/src/config/config.cjs#L1)

## Type Declaration

### development

> **development**: `object`

#### development.database

> **database**: `string` = `process.env.DATABASE_NAME`

#### development.dialect

> **dialect**: `string` = `"mysql"`

#### development.host

> **host**: `string` = `process.env.DATABASE_HOST`

#### development.password

> **password**: `string` = `process.env.DATABASE_PASSWORD`

#### development.username

> **username**: `string` = `process.env.DATABASE_USERNAME`

### production

> **production**: `object`

#### production.database

> **database**: `string` = `process.env.DATABASE_NAME`

#### production.dialect

> **dialect**: `string` = `"mysql"`

#### production.dialectOptions

> **dialectOptions**: `object`

#### production.dialectOptions.ssl

> **ssl**: `object`

#### production.dialectOptions.ssl.rejectUnauthorized

> **rejectUnauthorized**: `boolean` = `false`

#### production.dialectOptions.ssl.require

> **require**: `boolean` = `true`

#### production.host

> **host**: `string` = `process.env.DATABASE_HOST`

#### production.password

> **password**: `string` = `process.env.DATABASE_PASSWORD`

#### production.port

> **port**: `number` = `process.env.DATABASE_PORT`

#### production.username

> **username**: `string` = `process.env.DATABASE_USERNAME`

### test

> **test**: `object`

#### test.database

> **database**: `string` = `"database_test"`

#### test.dialect

> **dialect**: `string` = `"mysql"`

#### test.host

> **host**: `string` = `"127.0.0.1"`

#### test.password

> **password**: `null` = `null`

#### test.username

> **username**: `string` = `"root"`
