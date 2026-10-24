UPDATE "users"
SET
  "firstName" = CASE
    WHEN "name" IS NULL OR BTRIM("name") = '' THEN 'Unknown'
    ELSE SPLIT_PART(BTRIM("name"), ' ', 1)
  END,
  "lastName" = CASE
    WHEN "name" IS NULL OR BTRIM("name") = '' THEN 'Unknown'
    ELSE NULLIF(
      BTRIM(SUBSTRING(BTRIM("name") FROM POSITION(' ' IN BTRIM("name")) + 1)),
      ''
    )
  END;

-- 3. برای نام خانوادگی خالی مقدار پیش‌فرض موقت قرار بده
UPDATE "users"
SET "lastName" = 'Unknown'
WHERE "lastName" IS NULL;

-- 4. حالا ستون‌ها را اجباری کن
ALTER TABLE "users"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- 5. پس از انتقال اطلاعات، ستون قبلی را حذف کن
ALTER TABLE "users"
DROP COLUMN "name";