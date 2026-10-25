"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/config/routes";
import { loginAction } from "@/features/auth/auth.action";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth.schema";
import { getErrorNameLabel } from "@/lib/error";
import { toast } from "@/components/ui/toast";

export function useLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const res = await loginAction(values);

    if (!res.success) {
      toast.add({
        type: "error",
        title: getErrorNameLabel(res.errorName),
        description: res.message,
      });
      return;
    }

    toast.add({
      type: "success",
      description: res.message,
    });

    router.replace(ROUTES["admin"]);
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    showPassword,
    togglePasswordVisibility: () => setShowPassword((current) => !current),
  };
}
