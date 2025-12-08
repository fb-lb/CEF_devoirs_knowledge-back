import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Cursus } from "../models/Cursus.js";
import { getCursus } from "../services/cursus.service.js";

describe('Cursus service - getCursus', () => {
  let cursusId: number;
  let cursus: Partial<Cursus>;
  let findByPkCursusMock: Mock;

  beforeEach(() => {
    cursusId = 1;
    cursus = {
      id: 1,
      theme_id: 1,
      name: 'Guitare',
      price: 40,
      order: 1,
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-01T10:00:00.000Z'),
      createdBy: 1,
      updatedBy: null,
    };

    findByPkCursusMock = vi.spyOn(Cursus, 'findByPk');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return cursus data of successfull retrieved cursus', async () => {
    findByPkCursusMock.mockResolvedValue(cursus);

    const cursusDataResponse = await getCursus(cursusId);

    expect(findByPkCursusMock).toHaveBeenCalledWith(cursusId);
    expect(Object.keys(cursusDataResponse)).toEqual([
      "id",
      "themeId",
      "name",
      "price",
      "order",
      "createdAt",
      "updatedAt",
      "createdBy",
      "updatedBy",
    ]);
  });

  it('should return an AppError because cursus is not found', async () => {
    findByPkCursusMock.mockResolvedValue(null);

    await expect(getCursus(cursusId)).rejects.toMatchObject({
      status: 404,
      message: 'getCursus function in cursus service failed : cursus not found with provided id',
      messageFront: "Le cursus n'a pas été retrouvé avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    });

    expect(findByPkCursusMock).toHaveBeenCalledWith(cursusId);
  });

  it('should return an AppError because an unexpected error occurs', async () => {
    findByPkCursusMock.mockRejectedValue(new Error());

    await expect(getCursus(cursusId)).rejects.toMatchObject({
      status: 500,
      message: 'getCursus function in cursus service failed',
      messageFront: "La récupération du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
    });

    expect(findByPkCursusMock).toHaveBeenCalledWith(cursusId);
  });
});