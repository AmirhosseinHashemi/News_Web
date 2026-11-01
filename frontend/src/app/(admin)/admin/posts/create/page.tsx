import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ROUTES } from "@/config/routes";
import {
  CreatePostFormSection,
  CreatePostFormSkeleton,
} from "@/features/post/components/CreatePostFormSection";

export const metadata: Metadata = {
  title: "ایجاد خبر",
};

export default function Page() {
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

      <Suspense fallback={<CreatePostFormSkeleton />}>
        <CreatePostFormSection />
      </Suspense>
    </div>
  );
}
