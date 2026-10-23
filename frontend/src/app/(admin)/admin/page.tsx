import {
  WelcomeTitle,
  WelcomeTitleSkeleton,
} from "@/components/admin/WelcomeTitle";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<WelcomeTitleSkeleton />}>
        <WelcomeTitle />
      </Suspense>
    </div>
  );
}
