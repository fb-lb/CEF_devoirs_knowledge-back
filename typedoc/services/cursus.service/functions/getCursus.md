[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / getCursus

# Function: getCursus()

> **getCursus**(`cursusId`): `Promise`\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)\>

Defined in: [src/services/cursus.service.ts:60](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/cursus.service.ts#L60)

**`Function`**

Retrieves a cursus in the database with its ID.

## Parameters

### cursusId

`number`

The ID used to retrieve the cursus.

## Returns

`Promise`\<[`CursusData`](../../../types/Interfaces/interfaces/CursusData.md)\>

An object containing the cursus informations.

## Async

getCursus

## Throws

If the cursus is not found with provided ID.

## Throws

If an error occurs during cursus retrieval.
