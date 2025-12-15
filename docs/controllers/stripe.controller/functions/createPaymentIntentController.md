[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [controllers/stripe.controller](../README.md) / createPaymentIntentController

# Function: createPaymentIntentController()

> **createPaymentIntentController**(`req`, `res`): `Promise`\<`Response`\<[`ApiResponse`](../../../types/Interfaces/interfaces/ApiResponse.md)\<`any`\>, `Record`\<`string`, `any`\>\>\>

Defined in: [src/controllers/stripe.controller.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/707c5f23a1385bd57d03f302c9d2a43ff591ca2f/src/controllers/stripe.controller.ts#L29)

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
