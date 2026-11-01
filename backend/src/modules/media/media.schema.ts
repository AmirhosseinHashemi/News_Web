import z from "zod";
import { MediaType } from "../../generated/prisma/enums.js";

export type CreateMediaData = {
  type: MediaType;
  url: string;
  publicId?: string;
  mimeType: string;
  size: number;
};

export const deleteMediaSchema = z.object({
  publicId: z.string(),
});
