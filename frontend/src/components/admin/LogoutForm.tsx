"use client";

import { toast } from "@/components/ui/toast";
import { logoutAction, LogoutActionState } from "@/features/auth/auth.action";
import { getErrorNameLabel } from "@/lib/error";
import { Loader2, LogOut } from "lucide-react";
import { useActionState, useEffect } from "react";

const initialState: LogoutActionState = null;

export function LogoutForm() {
  const [state, formAction, isPending] = useActionState(
    logoutAction,
    initialState,
  );

  useEffect(() => {
    if (state) {
      toast.add({
        type: "error",
        title: getErrorNameLabel(state.errorName),
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <button
        disabled={isPending}
        type="submit"
        className="flex w-full items-center gap-2 text-destructive"
      >
        <LogOut className="size-4" />
        خروج از حساب
        {isPending && <Loader2 className="animate-spin" />}
      </button>
    </form>
  );
}
