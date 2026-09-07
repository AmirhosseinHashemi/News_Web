import mapPrismaError from "./prismaErrorMapper.js";

export const execute = async function <T>(query: () => Promise<T>) {
  try {
    return await query();
  } catch (error: unknown) {
    console.log(error);
    throw mapPrismaError(error);
  }
};
