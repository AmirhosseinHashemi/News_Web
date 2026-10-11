"use client";

import { useEffect } from "react";
import { ServerCrash } from "lucide-react";
import { StatusPage } from "@/components/shared/StatusPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code={500}
      icon={ServerCrash}
      title="خطایی رخ داد"
      description="مشکلی در نمایش این بخش پیش آمد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید."
      onRetry={reset}
      note={error.digest ? `کد پیگیری: ${error.digest}` : undefined}
    />
  );
}
