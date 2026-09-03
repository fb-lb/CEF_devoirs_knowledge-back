[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/element.service](../README.md) / getAllElements

# Function: getAllElements()

> **getAllElements**(): `Promise`\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>

Defined in: [src/services/element.service.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/services/element.service.ts#L26)

**`Function`**

Retrieves all elements from the database with relative informations if its type is 'text' or 'image'.

## Returns

`Promise`\<[`ElementData`](../../../types/Interfaces/type-aliases/ElementData.md)[]\>

A list of objects containing informations of all elements.

## Async

getAllElements

## Throws

If a text or an image is not found in the database.

## Throws

If an unexpected error occurs during elements retrieval.
