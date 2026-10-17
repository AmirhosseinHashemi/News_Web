import { ApiFailure } from "@/types/api.type";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly response: ApiFailure,
  ) {
    super(response.message);
    this.name = "ApiError";
  }
}
