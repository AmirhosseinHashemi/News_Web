import { LoginForm } from "@/features/auth/components/LoginForm";
import { ArrowUpLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود امن به پنل کاربری اخبار رحق",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-9">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">خوش آمدید</h2>

          <p className="text-sm leading-7 text-muted-foreground">
            برای ادامه، شماره همراه و رمز عبور خود را وارد کنید.
          </p>
        </div>

        <LoginForm />

        <div className="my-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">اخبار رحق</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="text-center text-sm leading-7 text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            ثبت‌نام کنید
            <ArrowUpLeft className="mr-1 inline size-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
