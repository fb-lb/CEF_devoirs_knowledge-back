import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Request, Response } from 'express';
import * as CursusService from '../services/cursus.service.js';
import * as LessonService from '../services/lesson.service.js';
import { MockResponse } from "../types/types.js";
import { CursusData, LessonData } from "../types/Interfaces.js";
import { createPaymentIntentController } from "../controllers/stripe.controller.js";
import * as StripeMock from 'stripe';

vi.mock("stripe", () => {
  const client_secret = "fake-client-secret-161541684";
  const createPaymentIntentsMock = vi.fn().mockResolvedValue({ client_secret: client_secret });
  return {
    client_secret: client_secret,
    createPaymentIntentsMock: createPaymentIntentsMock,
    default: vi.fn().mockImplementation(function () {
      return {
        paymentIntents: {
          create: createPaymentIntentsMock
        }
      }
    })
  };
});

const client_secret = (StripeMock as any).client_secret; 
const createPaymentIntentsMock = (StripeMock as any).createPaymentIntentsMock; 

function createMockResponse(): MockResponse {
  const res = {} as MockResponse;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('Stripe controller - createPaymentIntentController', () => {
  let req: Partial<Request>;
  let res: MockResponse;
  let getCursusSpy: Mock;
  let getLessonSpy: Mock;
  let cursus: CursusData;
  let lesson: LessonData;

  beforeEach(() => {
    req = {
      body: {
        type: 'cursus',
        courseId: 1,
      }
    };

    res = createMockResponse();

    getCursusSpy = vi.spyOn(CursusService, 'getCursus');
    getLessonSpy = vi.spyOn(LessonService, 'getLesson');

    cursus = {
      id: 1,
      themeId: 1,
      name: 'Le piano',
      price: 40,
      order: 1,
      createdAt: "2025-01-01 10:00:00",
      updatedAt: "2025-01-01 10:00:00",
      createdBy: 1,
      updatedBy: null,
    };

    lesson = {
      id: 1,
      cursusId: 1,
      name: 'Introduction',
      price: 10,
      order: 1,
      createdAt: "2025-01-01 10:00:00",
      updatedAt: "2025-01-01 10:00:00",
      createdBy: 1,
      updatedBy: null,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test of a successfull payment intent creation for a cursus purchase
  it('should return a response with a 200 status code and client secret (relative to payment intent) in data property', async () => {
    req.body.type = 'cursus';
    getCursusSpy.mockResolvedValue(cursus);
    getLessonSpy.mockResolvedValue(undefined);

    await createPaymentIntentController(req as Request, res as unknown as Response);

    expect(getCursusSpy).toHaveBeenCalledWith(req.body.courseId);
    expect(getLessonSpy).toHaveBeenCalledTimes(0);
    expect(createPaymentIntentsMock).toHaveBeenCalledWith(expect.objectContaining({
      amount: expect.any(Number),
      currency: 'eur',
      metadata: { type: req.body.type, courseId :req.body.courseId },
      automatic_payment_methods: { enabled: true },
    }));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: '',
      data: client_secret,
    }));
  });

  // Test of a successfull payment intent creation for a less purchase
  it('should return a response with a 200 status code and client secret (relative to payment intent) in data property', async () => {
    req.body.type = 'lesson';
    getCursusSpy.mockResolvedValue(undefined);
    getLessonSpy.mockResolvedValue(lesson);

    await createPaymentIntentController(req as Request, res as unknown as Response);
    
    expect(getCursusSpy).toHaveBeenCalledTimes(0);
    expect(getLessonSpy).toHaveBeenCalledWith(req.body.courseId);
    expect(createPaymentIntentsMock).toHaveBeenCalledWith(expect.objectContaining({
      amount: expect.any(Number),
      currency: 'eur',
      metadata: { type: req.body.type, courseId :req.body.courseId },
      automatic_payment_methods: { enabled: true },
    }));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: '',
      data: client_secret,
    }));
  });

  it('should throw an AppError because cursus or lesson is not found so price is not found either', async () => {
    req.body.type = 'cursus';
    getCursusSpy.mockResolvedValue(undefined);
    getLessonSpy.mockResolvedValue(undefined);

    await expect(createPaymentIntentController(req as Request, res as unknown as Response)).rejects.toMatchObject({
      status: 404,
      message: 'createPaymentIntentController in stripe controller failed : price is not found',
      messageFront: "L'achat n'est pas possible pour le moment, veuillez contacter le support pour solutionner le problème au plus vite."
    });

    expect(getCursusSpy).toHaveBeenCalledWith(req.body.courseId);
    expect(getLessonSpy).toHaveBeenCalledTimes(0);
  });

  it('should throw an AppError because an unexpected error occurs', async () => {
    req.body.type = 'cursus';
    getCursusSpy.mockRejectedValue(new Error());
    getLessonSpy.mockResolvedValue(undefined);

    await expect(createPaymentIntentController(req as Request, res as unknown as Response)).rejects.toMatchObject({
      status: 500,
      message: 'createPaymentIntentController in stripe controller failed',
      messageFront: "L'achat n'est pas disponible pour le moment, nous mettons tout en ouvre pour solutionner le problème au plus vite."
    });

    expect(getCursusSpy).toHaveBeenCalledWith(req.body.courseId);
    expect(getLessonSpy).toHaveBeenCalledTimes(0);
  });
});