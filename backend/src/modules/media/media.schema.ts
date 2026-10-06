import { MediaType } from "../../generated/prisma/enums.js";

export type CreateMediaData = {
  type: MediaType;
  filename: string;
  mimeType: string;
  size: number;
};
