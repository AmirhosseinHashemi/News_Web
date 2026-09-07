import type { Response } from "express";

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type SuccessResponse<T> = {
  message: string;
  data?: T;
  statusCode?: number;
  meta?: Meta;
};

export function sendSuccess<T>(
  res: Response,
  { message, statusCode = 200, data, meta }: SuccessResponse<T>
): void {
  const response: {
    success: boolean;
    message: string;
    data: T | null;
    meta: Meta | null;
    timestamp: string;
  } = {
    success: true,
    message,
    data: null,
    meta: null,
    timestamp: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} `,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (meta) {
    response.meta = meta;
  }

  res.status(statusCode).json(response);
}
