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

export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }
}
