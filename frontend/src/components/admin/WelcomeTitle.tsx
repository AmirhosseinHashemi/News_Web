import { Skeleton } from "@/components/ui/skeleton";
import { getMeReq } from "@/features/auth/auth.api";

export async function WelcomeTitle() {
  const res = await getMeReq();
  const userName = res.success ? res.data.name : "";

  return <h2 className="font-bold text-xl">خوش اومدی {userName}</h2>;
}

export async function WelcomeTitleSkeleton() {
  return <Skeleton className="w-64 h-8" />;
}