[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [services/user.service](../README.md) / getUserIdInRequest

# Function: getUserIdInRequest()

> **getUserIdInRequest**(`req`): `number`

Defined in: [src/services/user.service.ts:301](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/148f492cd1e7888bd6f05a7623a4561610d539d1/src/services/user.service.ts#L301)

**`Function`**

Checks if user property on the request object is not null. If not, it returns the ID of the user who made the request.

 getUserIdInRequest

## Parameters

### req

`Request`

The request sent by the front-end, containing a user property whose value is the user ID.

## Returns

`number`

Returns the ID of the user who made the request.

## Throws

If user property on the request object is null.
