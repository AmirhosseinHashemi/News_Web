import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { ValidationError } from "../errors/ValidationError.js";
import { mapZodError } from "../utils/zodErrorMapper.js";

type ValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    for (const [key, schema] of Object.entries(schemas)) {
      if (!schema) continue;

      const result = schema.safeParse(req[key as keyof Request]);

      if (!result.success) {
        return next(new ValidationError({ errors: mapZodError(result.error) }));
      }

      if (key === "query") {
        Object.defineProperty(req, "query", {
          value: result.data,
          configurable: true,
          enumerable: true,
        });
      } else {
        req[key as "body" | "params"] = result.data;
      }
    }

    next();
  };
}
