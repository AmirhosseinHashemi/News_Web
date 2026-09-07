export type FieldError = {
  field: string;
  message: string;
};

export type AppErrorOptions = {
  message?: string;
  statusCode?: number;
  errors?: FieldError[];
  isOperational?: boolean;
};

export type ValidationErrorOptions = {
  message?: string;
  errors?: FieldError[];
};

export type ConfilictErrorOption = ValidationErrorOptions;
