/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "media_publicId_key" ON "media"("publicId");
