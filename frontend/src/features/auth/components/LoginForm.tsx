"use client";

import { Eye, EyeOff, LockKeyhole, Smartphone } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import Link from "next/link";

export function LoginForm() {
  const {
    form,
    onSubmit,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Controller
        control={form.control}
        name="phone"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">شماره همراه</FieldLabel>

            <div className="relative">
              <Smartphone
                aria-hidden="true"
                className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                {...field}
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="09123456789"
                dir="ltr"
                aria-invalid={fieldState.invalid}
                className="pr-11 text-left text-sm"
              />
            </div>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">رمز عبور</FieldLabel>

            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="رمز عبور خود را وارد کنید"
                aria-invalid={fieldState.invalid}
                className="px-11 text-sm"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={
                  showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                }
                aria-pressed={showPassword}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          فراموشی رمز عبور؟
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-semibold"
      >
        {isSubmitting ? "در حال ورود..." : "ورود به حساب کاربری"}
      </Button>
    </form>
  );
}
