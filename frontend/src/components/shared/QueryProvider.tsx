"use client";

import { toast } from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError(error, variables, onMutateResult, context) {
              console.log(
                "---------------------- mutation error : -----------------------",
              );
              console.error(error);
              console.log(variables);
              console.log(onMutateResult);
              console.log(context);
              console.log(
                "---------------------- mutation error  -----------------------",
              );

              toast.add({
                type: "error",
                title: "خطای عملیات",
                description: "خطای پیش اومده. کنسول را چک کنید",
              });
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
