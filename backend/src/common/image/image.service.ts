import sharp from "sharp";

export async function processImage(buffer: Buffer) {
  return sharp(buffer)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
    })
    .toBuffer();
}
