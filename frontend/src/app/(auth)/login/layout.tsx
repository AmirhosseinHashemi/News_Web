import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main dir="rtl" className="relative h-dvh overflow-hidden bg-background">
      <div className="grid h-full lg:grid-cols-2">
        <aside className="relative hidden min-h-0 overflow-hidden lg:block">
          <Image
            src="/images/auth/login-bg.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-primary/20" />
        </aside>

        <section className="relative grid items-center overflow-y-auto px-5 py-12 sm:py-8 sm:px-8 lg:px-12">
          <div className="absolute left-5 sm:left-1.5 top-1.5">
            <ThemeToggle />
          </div>
          <div className="w-full max-w-md mx-auto">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-9">
              <div className="mb-8 space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">خوش آمدید</h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  برای ادامه، شماره همراه و رمز عبور خود را وارد کنید.
                </p>
              </div>

              {children}

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
        </section>
      </div>
    </main>
  );
}
