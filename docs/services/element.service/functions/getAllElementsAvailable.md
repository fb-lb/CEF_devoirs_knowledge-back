[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / getAllElementsAvailable

# Function: getAllElementsAvailable()

> **getAllElementsAvailable**(`userId`): `Promise`\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>

Defined in: [src/services/element.service.ts:100](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/services/element.service.ts#L100)

**`Function`**

Retrieves all elements available for a specific user from the database with relative informations if element's type is 'text' or 'image'.

## Parameters

### userId

`number`

The ID the user used to find accessible lessons for this user and then know accessible elements.

## Returns

`Promise`\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>

A list of objects containing informations of all elements avaible for this user.

## Async

getAllElementsAvailable

## Throws

If an unexpected error occurs during elements retrieval.
