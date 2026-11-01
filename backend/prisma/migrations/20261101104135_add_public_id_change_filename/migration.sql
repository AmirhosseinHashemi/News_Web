ALTER TABLE "media"
RENAME COLUMN "filename" TO "url";

ALTER TABLE "media"
ADD COLUMN "publicId" TEXT;
