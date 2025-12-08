import { Mock } from "vitest";
import { Response } from 'express';

export type MockResponse = Omit<Response, 'status' | 'json'> & {
  status: Mock;
  json: Mock;
};