"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/features/auth/auth.action";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Smartphone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    await loginAction(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          شماره همراه
        </label>

        <div className="relative">
          <Smartphone
            aria-hidden="true"
            className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="09123456789"
            dir="ltr"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="pr-11 text-left text-sm"
            {...register("phone")}
          />
        </div>

        {errors.phone && (
          <p id="phone-error" role="alert" className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          رمز عبور
        </label>

        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="رمز عبور خود را وارد کنید"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="px-11 text-sm"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <a
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          فراموشی رمز عبور؟
        </a>
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
