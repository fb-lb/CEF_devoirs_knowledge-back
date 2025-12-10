[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [config/config](../README.md) / export=

# Variable: export=

> **export=**: `object`

Defined in: [src/config/config.cjs:1](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/config/config.cjs#L1)

## Type Declaration

### development

> **development**: `object`

#### development.database

> **database**: `string` = `process.env.DB_NAME`

#### development.dialect

> **dialect**: `string` = `"mysql"`

#### development.host

> **host**: `string` = `process.env.DB_HOST`

#### development.password

> **password**: `string` = `process.env.DB_PASSWORD`

#### development.username

> **username**: `string` = `process.env.DB_USERNAME`

### production

> **production**: `object`

#### production.database

> **database**: `string` = `"database_production"`

#### production.dialect

> **dialect**: `string` = `"mysql"`

#### production.host

> **host**: `string` = `"127.0.0.1"`

#### production.password

> **password**: `null` = `null`

#### production.username

> **username**: `string` = `"root"`

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
