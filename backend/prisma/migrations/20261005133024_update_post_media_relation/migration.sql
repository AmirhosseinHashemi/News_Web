/*
  Warnings:

  - You are about to drop the column `altText` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `isCover` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coverId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_postId_fkey";

-- DropIndex
DROP INDEX "media_postId_sortOrder_idx";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "altText",
DROP COLUMN "caption",
DROP COLUMN "isCover",
DROP COLUMN "postId",
DROP COLUMN "sortOrder",
DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "coverId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "posts_coverId_key" ON "posts"("coverId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
