import fs from "node:fs/promises";
import path from "node:path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function saveFile(buffer: Buffer, filename: string) {
  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const filePath = path.join(uploadDir, filename);

  await fs.writeFile(filePath, buffer);

  return {
    filename,
    path: filePath,
  };
}
