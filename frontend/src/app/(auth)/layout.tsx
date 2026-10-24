import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Image from "next/image";

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
          {children}
        </section>
      </div>
    </main>
  );
}
