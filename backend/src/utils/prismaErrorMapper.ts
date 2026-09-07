import { ConflictError } from "../errors/ConflictError.js";
import { NotFoundError } from "../errors/NotFound.js";
import { Prisma } from "../generated/prisma/client.js";

type PrismaDuplicateMeta = {
  driverAdapterError?: {
    cause?: {
      constraint?: {
        fields?: string[];
      };
    };
  };
};

export default function mapPrismaError(err: unknown): unknown {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
    return err;
  }

  switch (err.code) {
    case "P2002": {
      const meta = err.meta as PrismaDuplicateMeta | undefined;

      const fields = meta?.driverAdapterError?.cause?.constraint?.fields;

      return new ConflictError({
        message: Array.isArray(fields)
          ? `${fields.join(", ")} already exists`
          : "Duplicate value",
        errors: Array.isArray(fields)
          ? fields.map((field) => ({
              field,
              message: `${field} already exists`,
            }))
          : [],
      });
    }

    case "P2003":
      return new ConflictError({
        message: "This operation violates a resource relationship.",
      });

    case "P2025":
      return new NotFoundError();

    default:
      return err;
  }
}
