import { Request, Response } from "express";
import { ApiResponse } from "../types/Interfaces.js";
import Stripe from 'stripe';
import { AppError } from "../utils/AppError.js";
import { getCursus } from "../services/cursus.service.js";
import { getLesson } from "../services/lesson.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export async function createPaymentIntentController(req: Request, res: Response): Promise<Response<ApiResponse<any>>> {
  try {
    const type: 'cursus' | 'lesson' = req.body.type;
    const courseId: number = Number(req.body.courseId);

    let amountInCents = -1;

    if (type === 'cursus') {
      const cursus = await getCursus(courseId);
      if (cursus) amountInCents = Math.round(cursus.price * 100);
    }

    if (type === 'lesson') {
      const lesson = await getLesson(courseId);
      if (lesson) amountInCents = Math.round(lesson.price * 100);
    }

    if (amountInCents === -1) throw new AppError(
      404,
      'createPaymentIntentController in stripe controller failed : price is not found',
      "L'achat n'est pas possible pour le moment, veuillez contacter le support pour solutionner le problème au plus vite."
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      metadata: { type, courseId },
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      success: true,
      message: '',
      data: paymentIntent.client_secret,
    });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      'createPaymentIntentController in stripe controller failed',
      "L'achat n'est disponible pour le moment, nous mettons tout en ouvre pour solutionner le problème au plus vite.",
      { cause: error},
    )
  }
  
  
}