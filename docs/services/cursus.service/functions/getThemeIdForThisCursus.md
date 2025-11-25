[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/cursus.service](../README.md) / getThemeIdForThisCursus

# Function: getThemeIdForThisCursus()

> **getThemeIdForThisCursus**(`cursusId`): `Promise`\<`number`\>

Defined in: [src/services/cursus.service.ts:301](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/c8c533ab6fd4749c61887011f2eaf102002dd722/src/services/cursus.service.ts#L301)

**`Function`**

Retrieves the theme ID of the theme containing a specific cursus.

## Parameters

### cursusId

`number`

The ID of the cursus used to know which theme ID is wanted.

## Returns

`Promise`\<`number`\>

The ID of the theme containing the cursus.

## Async

getThemeIdForThisCursus

## Throws

If cursus is not found with the provided ID.

## Throws

If an unexpected error occurs during theme ID retrieval.
