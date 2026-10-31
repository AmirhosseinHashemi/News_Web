import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { getCategoriesReq } from "@/features/category/category.api";
import { CreatePostForm } from "@/features/post/components/CreatePostForm";
import {
  POST_LOCATION_OPTIONS,
  POST_TYPE_OPTIONS,
} from "@/features/post/post.constant";

export const metadata: Metadata = {
  title: "ایجاد خبر",
};

export default async function Page() {
  const categoriesResponse = await getCategoriesReq({ limit: 100 });
  const categories = categoriesResponse.success ? categoriesResponse.data : [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href={ROUTES.posts}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          بازگشت به خبرها
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">ایجاد خبر جدید</h1>
          <p className="text-sm text-muted-foreground">
            اطلاعات خبر را تکمیل کنید؛ در ابتدا به‌صورت پیش‌نویس ذخیره می‌شود.
          </p>
        </div>
      </div>

      <CreatePostForm
        categories={categories}
        types={POST_TYPE_OPTIONS}
        locations={POST_LOCATION_OPTIONS}
      />
    </div>
  );
}
