[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/stripe.controller](../README.md) / createPaymentIntentController

# Function: createPaymentIntentController()

> **createPaymentIntentController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/stripe.controller.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/ee7c1c461a940a1b958617819327f544dba91c27/src/controllers/stripe.controller.ts#L29)

Handle stripe payment intent creation.

## Parameters

### req

`Request`

Express request containing the purchase informations in the body.

### res

`Response`

Express response.

## Returns

`Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Returns: 200

## Route

POST /api/stripe/create-payment-intent

## Description

Steps:
- Sets the price to pay,
- Creates the stripe payment intent.

## Throws

If the lesson or the cursus to pay is not found.

## Throws

If an unexpected error occurs during the stripe payment intent creation.
