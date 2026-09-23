/*
  Warnings:

  - You are about to drop the column `location` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `posts` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "location",
DROP COLUMN "type",
ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "PostLocation";

-- DropEnum
DROP TYPE "PostType";

-- CreateTable
CREATE TABLE "post_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_types_name_key" ON "post_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "post_types_slug_key" ON "post_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "post_locations_name_key" ON "post_locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "post_locations_slug_key" ON "post_locations"("slug");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "post_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "post_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
