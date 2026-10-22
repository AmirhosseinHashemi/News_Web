import type { ApiFailure, ErrorName } from "@/types/api.type";

export const NETWORK_ERR_MSG = "خطایی در اتصال به شبکه رخ داده";

export const ERROR_NAME_LABELS = {
  ValidationError: "خطای اعتبارسنجی",
  UnauthorizedError: "عدم احراز هویت",
  NotFoundError: "موردی یافت نشد",
  InvalidCredentialError: "اطلاعات ورود نامعتبر است",
  ForbiddenError: "دسترسی غیرمجاز",
  ConflictError: "تضاد در داده‌ها",
  BadRequestError: "درخواست نامعتبر",
  UnknownError: "خطای ناشناخته",
  NetworkError: "خطا در اتصال",
} satisfies Record<ErrorName, string>;

export function getErrorNameLabel(name: ErrorName): string {
  return ERROR_NAME_LABELS[name] ?? ERROR_NAME_LABELS.UnknownError;
}

export const failure = (
  status: number,
  errorName: ApiFailure["errorName"],
  message: string,
): ApiFailure => ({
  status,
  success: false,
  message,
  errorName,
  errors: [],
  timestamp: new Date().toISOString(),
});
