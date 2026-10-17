export type ApiMeta = {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ErrorName =
  | "ValidationError"
  | "UnauthorizedError"
  | "NotFoundError"
  | "InvalidCredentialError"
  | "ForbiddenError"
  | "ConflictError"
  | "BadRequestError"
  | "UnknownError";

export type ApiError = {
  field: string;
  message: string;
};

export type ApiSuccess<T> = {
  status: number;
  success: true;
  message: string;
  data: T;
  meta: ApiMeta | null;
  timestamp: string;
};

export type ApiFailure = {
  status: number;
  success: false;
  message: string;
  errorName: ErrorName;
  errors: ApiError[];
  timestamp: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type HttpOptions = Omit<RequestInit, "body"> & { body?: unknown };
