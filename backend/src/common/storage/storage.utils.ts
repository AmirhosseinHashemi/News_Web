import crypto from "node:crypto";

export function generateFilename() {
  return `${crypto.randomUUID()}.webp`;
}
